export function getAsset(path: string) {
  return `https://raw.githubusercontent.com/retejs/retejs.org/assets/${path}`;
}

export function getPreview(path: string) {
  return getAsset(`preview/${path}`);
}

export const mainPreview = getAsset('main.png');
