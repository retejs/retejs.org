export function flat(list: { children?: any[] }[]) {
  return list.map((item) => (item.children && item.children.length ? flat(item.children) : item)).flat();
}
