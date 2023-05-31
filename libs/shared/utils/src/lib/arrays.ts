// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filter = (array: any[], props: string[], search: string): any[] => {
  if (!props || props.length === 0 || !search || search.length === 0 || !array || array.length === 0) return array;
  return array?.filter((item) => props.some((prop) => item[prop]?.toLowerCase().includes(search.toLowerCase())));
};
