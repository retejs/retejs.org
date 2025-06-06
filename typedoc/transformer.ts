/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
import { defineTransformer } from '@nuxt/content'
import { createShikiHighlighter, rehypeHighlight } from '@nuxtjs/mdc/runtime'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import {
  makeRecursiveVisitor, Deserializer, Application, TypeContext, DeclarationReflection,
  ReflectionType, Type, ProjectReflection, ContainerReflection, Reflection, CommentDisplayPart,
  SourceReference,
} from 'typedoc';
import prettier from 'prettier';
import type { LanguageRegistration } from 'shiki'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import { MdcConfig, ModuleOptions as MDCModuleOptions } from '@nuxtjs/mdc';
import { visit } from 'unist-util-visit'
import { hash } from 'ohash'

function findChildren(root: ContainerReflection, id: number) {
  if (!root.children) return [];
  // eslint-disable-next-line no-restricted-syntax
  for (const child of root.children) {
    if (child.id === id) return [child];
    const found = findChildren(child, id);
    if (found.length) return [child, ...found];
  }
  return [];
}

function getType(type: Type | undefined) {
  if (!type) return 'unknown';
  // eslint-disable-next-line no-use-before-define
  fixTypeStringify(type);
  return type.stringify(TypeContext.none);
}

async function code(text: string) {
  try {
    const formatted = await prettier.format(text, { parser: 'typescript' });

    return ['````ts', formatted, '````'].join('\n');
  } catch (e) {
    return ['````ts', text, '````'].join('\n');
  }
}
function getSignatureBlocks(ref: Reflection, tag: string) {
  const arr: CommentDisplayPart[] = [];

  ref.comment?.blockTags
    ?.filter((item) => item.tag === tag)
    .forEach((item) => arr.push(...item.content));

  return arr;
}
function stringifyContent(comments?: CommentDisplayPart[]) {
  return (comments?.map((item) => {
    if (item.kind === 'code') return `\`${item.text}\``;
    return item.text;
  }) || []).join('');
}
function getSummary(decl: Reflection) {
  return stringifyContent(decl.comment?.summary);
}
function getTypeParameters(item: DeclarationReflection) {
  const parameters = item.typeParameters ? item.typeParameters.map((parameter) => ({
    name: parameter.name,
    type: getType(parameter.type),
    comment: getSummary(parameter),
  })) : [];

  return parameters;
}

function getAnchor(data: ProjectReflection, id: number) {
  const childrenPath = findChildren(data, id);

  if (!childrenPath.length) return null;

  return childrenPath.map((item) => item.name).join('-').toLowerCase();
}

function link(data, arg, text) {
  return `[${sanitize(text)}](#${getAnchor(data, arg.target)})`;
}

function stringifyObject(type: ReflectionType) {
  const props = (type.declaration.children || []).map((c) => `${c.name}: ${c.type?.stringify(TypeContext.none) || 'unknown'}`);

  return `{ ${props.join(', ')} }`;
}
function stringifyFunction(type: ReflectionType) {
  const signature = type.declaration.signatures?.[0];

  if (!signature) return 'unknown';

  const params = (signature.parameters || []).map((p) => `${p.name}: ${p.type?.stringify(TypeContext.none) || 'any'}`);

  return `(${params}) => ${getType(signature.type)}`;
}
function getPriority(item: Reflection) {
  const tags = item.comment?.blockTags || [];

  return +(tags.find((item) => item.tag === '@priority')?.content[0].text || 0);
}

function sanitize(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function typedocToMarkdown(
  data: ProjectReflection,
  children: DeclarationReflection[] | undefined = [],
  markdown: string[] = [],
  level = 0,
) {
  children.sort((a, b) => getPriority(b) - getPriority(a));

  function typeParametersTable(parameters) {
    if (parameters && parameters.length) {
      markdown.push('| Parameter | Extends | Description |');
      markdown.push('| ---- | ---- | ----------- |');
      parameters.forEach(({ name, type, comment }) => markdown.push(`| ${name} | \`${sanitize(type) || 'any'}\` | ${comment} |`));
    }
  }
  function throws(ref: Reflection) {
    const throws = getSignatureBlocks(ref, '@throws');

    if (throws.length) {
      markdown.push(`\n**Throws** ${stringifyContent(throws)}`);
    }
  }
  function emits(ref: Reflection) {
    const emits = getSignatureBlocks(ref, '@emits');

    if (emits.length) {
      markdown.push(`\n**Emits** ${emits.map((item) => `\`${item.text}\``).join(' ')}`);
    }
  }
  function listens(ref: Reflection) {
    const listens = getSignatureBlocks(ref, '@listens');

    if (listens.length) {
      markdown.push(`\n**Listens** ${listens.map((item) => `\`${item.text}\``).join(' ')}`);
    }
  }
  function examples(ref: Reflection) {
    const examples = getSignatureBlocks(ref, '@example').flat();

    if (examples.length) {
      markdown.push('\n**Examples**');
      examples.forEach((example) => markdown.push(example.text));
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const item of children) {
    markdown.push(`${new Array(level + 1).fill('#').join('')} ${item.name} {#${getAnchor(data, item.id)}}`);

    if (item.sources) {
      item.sources.forEach((source) => {
        markdown.push('::references');
        markdown.push(`:ref-github{title="${source.fileName}" link="${source.url}"}`);
        markdown.push('::');
      });
    }

    if (item.comment) {
      markdown.push(getSummary(item));
    }

    if (item.kind === 4194304) {
      const parameters = getTypeParameters(item);

      markdown.push(await code(`type ${item.name}${parameters?.length ? `<${parameters.map((p) => (p.name + (p.type ? ` extends ${p.type}` : ''))).join(', ')}>` : ''} = ${getType(item.type)}`));

      typeParametersTable(parameters);
    } else if (item.kind === 128) {
      const parameters = getTypeParameters(item);

      markdown.push(await code(`class ${item.name}${parameters?.length ? `<${parameters.map((p) => (p.name + (p.type ? ` extends ${p.type}` : ''))).join(', ')}>` : ''}`));

      typeParametersTable(parameters);
    } else if (item.kind === 1024) {
      markdown.push(await code(`${item.name}: ${getType(item.type)}`));
    }

    if (item.variant === 'declaration') {
      if (item.extendedBy) {
        markdown.push(`\n**Extended by** ${item.extendedBy.map((item) => link(data, item, getType(item))).join(', ')}`);
      }
      if (item.extendedTypes) {
        markdown.push(`\n**Extends** ${item.extendedTypes.map((item) => link(data, item, getType(item))).join(', ')}`);
      }
      if (item.implementedTypes) {
        markdown.push(`\n**Implements** ${item.implementedTypes.map((item) => link(data, item, getType(item))).join(', ')}`);
      }
      if (item.implementedBy) {
        markdown.push(`\n**Implemented by** ${item.implementedBy.map((item) => link(data, item, getType(item))).join(', ')}`);
      }

      emits(item);
      listens(item);
      throws(item);
      examples(item);

      if (item.signatures) {
        // eslint-disable-next-line no-restricted-syntax
        for (const signature of item.signatures) {
          if (signature.comment) {
            markdown.push(getSummary(signature));
          }
          const returnType = getType(signature.type);
          const parameters = signature.parameters ? signature.parameters.map((parameter) => ({
            name: parameter.name,
            type: getType(parameter.type),
            comment: getSummary(parameter),
          })) : [];

          markdown.push(await code(`${item.name}(${parameters.map((p) => `${p.name}: ${p.type}`).join(', ')}): ${returnType}`));

          emits(signature);
          listens(signature);
          throws(signature);
          examples(signature);

          if (parameters && parameters.length) {
            markdown.push('| Parameter | Type | Description |');
            markdown.push('| ---- | ---- | ----------- |');
            parameters.forEach(({ name, type, comment }) => markdown.push(`| ${name} | \`${type || 'any'}\` | ${comment} |`));
          }
          if (signature.type) {
            markdown.push(`\n**Returns** \`${returnType}\``);
            if (signature.comment) {
              const block = getSignatureBlocks(signature, '@returns')[0];

              markdown.push(block?.text);
            }
          }
        }
      }
    }

    if (item.children) {
      await typedocToMarkdown(data, item.children, markdown, level + 1);
    }
  }
}

function fixTypeStringify(type: Type) {
  const visitor = makeRecursiveVisitor({
    reflection(type) {
      type.getTypeString = (function () {
        if (!this.declaration.children && this.declaration.signatures) {
          return stringifyFunction(this);
        }
        return stringifyObject(this);
      }).bind(type);
    },
  });
  type.visit(visitor);
}

function fixReflectionStringify(reflection: Reflection) {
  reflection.traverse((item) => {
    if (item.type) fixTypeStringify(item.type);
  });
}

function getSources(project: DeclarationReflection): SourceReference[] {
  return [
    ...(project.sources || []),
    ...(project.children?.map((child) => getSources(child)).flat() || []),
  ];
}
function getRepositoryURL(url: string) {
  const regex = /https?:\/\/([^/]+)\/([^/]+\/[^/]+)/;
  const match = url.match(regex);

  if (match && match.length >= 3) {
    return `https://${match[1]}/${match[2]}`;
  }
  return null;
}

function extractRepositoryURL(project: ProjectReflection): string | null {
  if (!project.children?.length) return null;

  const sources = project.children.map(getSources).flat();
  const someSourceUrl = sources.find((source) => source.url)?.url;

  if (!someSourceUrl) return null;

  return getRepositoryURL(someSourceUrl);
}

type HighlighterOptions = Exclude<MDCModuleOptions['highlight'], false | undefined> & { compress: boolean }
type HighlightedNode = { type: 'element', properties?: Record<string, string | undefined> }

// https://github.com/nuxt/content/blob/v3.5.1/src/utils/content/index.ts

async function _getHighlightPlugin(key: string, options: HighlighterOptions) {
  const langs = Array.from(new Set(['bash', 'html', 'mdc', 'vue', 'yml', 'scss', 'ts', 'typescript', ...(options.langs || [])]))
  const themesObject = typeof options.theme === 'string' ? { default: options.theme } : options.theme || { default: 'material-theme-palenight' }
  const bundledThemes = await Promise.all(Object.entries(themesObject)
    .map(async ([name, theme]) => [
      name,
      typeof theme === 'string' ? (await import(`shiki/themes/${theme}.mjs`).then(m => m.default || m)) : theme,
    ]))
  const bundledLangs = await Promise.all(langs.map(async lang => [
    typeof lang === 'string' ? lang : (lang as unknown as LanguageRegistration).name,
    typeof lang === 'string' ? await import(`@shikijs/langs/${lang}`).then(m => m.default || m) : lang,
  ]))

  const highlighter = createShikiHighlighter({
    bundledThemes: Object.fromEntries(bundledThemes),
    // Configure the bundled languages
    bundledLangs: Object.fromEntries(bundledLangs),
    engine: createOnigurumaEngine(import('shiki/wasm')),
    getMdcConfigs: () => Promise.resolve([] as MdcConfig[]),
  })

  const highlightPlugin = {
    key,
    instance: rehypeHighlight,
    ...options,
    options: {
      highlighter: async (code, lang, theme, opts) => {
        const result = await highlighter(code, lang, theme, opts)
        const visitTree = {
          type: 'element',
          children: result.tree as Array<unknown>,
        }
        if (options.compress) {
          const stylesMap: Record<string, string> = {}
          visit(
            visitTree,
            node => !!(node as HighlightedNode).properties?.style,
            (_node) => {
              const node = _node as HighlightedNode
              const style = node.properties!.style!
              stylesMap[style] = stylesMap[style] || 's' + hash(style).substring(0, 4)
              node.properties!.class = `${node.properties!.class || ''} ${stylesMap[style]}`.trim()
              node.properties!.style = undefined
            },
          )

          result.style = Object.entries(stylesMap).map(([style, cls]) => `html pre.shiki code .${cls}, html code.shiki .${cls}{${style}}`).join('') + result.style
        }

        return result
      },
      theme: Object.fromEntries(bundledThemes),
    },
  }
  return highlightPlugin
}

export default defineTransformer({
  name: 'typedoc-transformer',
  extensions: ['.typedoc'],
  async parse(file) {
    const data = typeof file.body === 'object' ? file.body : JSON.parse(file.body);

    const app = new Application();
    const d = new Deserializer(app);
    const reflection = d.reviveProject(data);

    fixReflectionStringify(reflection);

    const markdown = [`# API for \`${data.name}\` package`];

    await typedocToMarkdown(reflection, reflection.children, markdown, 1);

    // const parsed = await parseMarkdown(markdown.join('\n'))

    const parsed = await parseMarkdown(markdown.join('\n'), {
      remark: { plugins: { 'remark-heading-id': {} } },
      rehype: {
        plugins: {
          hightlight: await _getHighlightPlugin('typedoc', {
            theme: 'one-dark-pro',
          })
        }
        // plugins: config.rehypePlugins,
        // options: { handlers: { link } },
      },
    }, {
      fileOptions: file,
    })


    return {
      ...parsed.data,
      excerpt: parsed.excerpt,
      navigation: {
        title: data.name,
        repository: extractRepositoryURL(reflection),
      },
      extension: 'md',
      body: parsed.body,
      // body: markdown.join('\n'),
      // id: file.id.replace(/\.typedoc$/, '.md'),
      id: file.id,
    }
  },
});
