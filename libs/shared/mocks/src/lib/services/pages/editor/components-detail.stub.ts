export async function getDefaultData(id: string) {
  // if (['cCardView', 'cQuickLinkView', 'cHeader', 'cButton', 'cNewsCarousel', 'cScoreBoard'].includes(id)) {
  const payload = await import(`./stubs/components/${id}`);
  return { ...payload.default };
  // }
  //return { component_id: id, component_name: id + '*', component_type: 'Native' };
}

const getComponentsDetail = async (id: string) => {
  const data = await getDefaultData(id);
  console.log('getComponentsDetail', data);
  return data;
};
export default getComponentsDetail;
