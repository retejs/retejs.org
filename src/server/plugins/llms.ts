import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin((nitroApp: any) => {
  nitroApp.hooks.hook('llms:generate', (event: string, options: any) => {
    const domain = options.domain

    for (const section of options.sections) {
      for (const link of section.links) {
        if (link.href.startsWith(`${domain}/en/`)) {
          link.href = link.href.replace(`${domain}/en/`, `${domain}/`)
        }
      }
    }
  })
})
