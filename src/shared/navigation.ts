// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flat(list: { children?: any[] }[]): any {
  return list.map(item => item.children?.length
    ? flat(item.children)
    : item).flat()
}
