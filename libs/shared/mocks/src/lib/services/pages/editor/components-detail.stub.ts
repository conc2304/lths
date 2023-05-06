export async function getDefaultData(id) {
  if (id === 'cCardView') {
    const payload = await import(`./stubs/components/${id}`);
    return { ...payload.default };
  }
  return { component_id: id, component_name: 'Generic View - ' + id, component_type: 'Native' };
}

const getComponentsDetail = async (id) => {
  const data = await getDefaultData(id);
  console.log('getComponentsDetail', data);
  return data;
};
export default getComponentsDetail;
