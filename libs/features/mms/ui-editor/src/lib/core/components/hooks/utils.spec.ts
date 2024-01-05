import { updateNestedProp } from './utils';
import { HeroCarouselPagePayload } from './utils.sample';
import { ComponentProps } from '../../../context';
describe('updateNestedProp', () => {
  const data: ComponentProps = {
    data: {
      title: 'Test Title',
      text_size: '2',
      colors: ['red'],
      link_text: [
        { link_key: '1', action: { page_id: 'welcome', type: 'a', page_link: 'test' } },
        { link_key: '2', action: { page_id: 'home', page_link: 'parking' } },
      ],
    },
    __ui_id__: '',
    _id: '',
    component_id: '',
    name: '',
    description: '',
    image_url: '',
    schema: {},
    display_order: 0,
    variation_id: '',
  };

  it('should update a nested property without index', () => {
    const updatedData = updateNestedProp(data, 'title', 'New Title', undefined, ['data']);
    expect(updatedData.data.title).toEqual('New Title');
  });

  it('should update a nested property with index', () => {
    const updatedData = updateNestedProp(data, 'link_key', 'abc', 1, ['data', 'link_text']);
    expect(updatedData.data.link_text[1].link_key).toEqual('abc');
  });

  it('should update an array element property', () => {
    const updatedData = updateNestedProp(data, 'action', { type: 'native' }, 1, ['data', 'link_text']);
    expect(updatedData.data.link_text[1].action.type).toEqual('native');
  });

  it('should not update when array index is out of bounds', () => {
    const updatedData = updateNestedProp(data, 'link_key', 'abc', 10, ['data', 'link_text']);
    expect(updatedData).toEqual(data);
  });
  it('should create an array when a non-existent prop is used', () => {
    const updatedData = updateNestedProp(data, 'link_key', 'abc', 10, ['data', 'link_text2']);
    expect(updatedData.data['link_text2'].length).toBeGreaterThanOrEqual(0);
  });
});

describe('updateHeroCarousel-NestedComponentsWithNestedProps', () => {
  const data: ComponentProps = HeroCarouselPagePayload.data.components[0];

  it('should update a nested property in nested carousel component', () => {
    const updatedData = updateNestedProp(data, ['data', 'away_team_name'], 'New Title', 0, [
      'data',
      'sub_component_data',
    ]);
    expect(updatedData.data.sub_component_data[0].data.away_team_name).toEqual('New Title');
  });

  it('should update a nested property without index', () => {
    const updatedData = updateNestedProp(data, 'title', 'New Title', undefined, ['data']);
    expect(updatedData.data.title).toEqual('New Title');
  });

  it('should create an array when a non-existent prop is used', () => {
    const updatedData = updateNestedProp(data, 'link_key', 'abc', 10, ['data', 'link_text2']);
    expect(updatedData.data['link_text2'].length).toBeGreaterThanOrEqual(0);
  });
});
