import { updateNestedProp, swapArrayItems } from './utils';
import { HeroCarouselPagePayload } from './utils.sample';
import { ComponentProps } from '../../../context';
import mockComponentProps from '../../../context/mock-data';

describe('updateNestedProp', () => {
  const data: ComponentProps = {
    ...mockComponentProps,
    data: {
      title: 'Test Title',
      text_size: '2',
      colors: ['red'],
      link_text: [
        { link_key: '1', action: { page_id: 'welcome', type: 'a', page_link: 'test' } },
        { link_key: '2', action: { page_id: 'home', page_link: 'parking' } },
      ],
    },
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

describe('swapArrayItems', () => {
  const data: ComponentProps = {
    ...mockComponentProps,
    data: {
      title: 'Test Title',
      colors: ['red', 'blue', 'green'],
      link_text: [
        { link_key: '1', action: { page_id: 'welcome', type: 'a', page_link: 'test' } },
        { link_key: '2', action: { page_id: 'home', page_link: 'parking' } },
      ],
    },
  };
  
  it('should swap item in nested array property', () => {
    const updatedData = swapArrayItems(data, 0, 2, ['data', 'colors']);
    expect(updatedData.data.colors[0]).toEqual(data.data.colors[2]);
    expect(updatedData.data.colors[2]).toEqual(data.data.colors[0]);

    const updatedData2 = swapArrayItems(data, 0, 1, ['data', 'link_text']);
    expect(updatedData2.data.link_text[0]).toEqual(data.data.link_text[1]);
    expect(updatedData2.data.link_text[1]).toEqual(data.data.link_text[0]);
  });

  it('should not update when index are out of range', () => {
    const updatedData = swapArrayItems(data, 0, 2, ['data', 'link_text']);
    expect(updatedData).toEqual(data);

    const updatedData2 = swapArrayItems(data, -1, 1, ['data', 'link_text']);
    expect(updatedData2).toEqual(data);
  });

  it('should not update when index not given', () => {
    const updatedData = swapArrayItems(data, 0, undefined, ['data', 'link_text']);
    expect(updatedData).toEqual(data);
  });

  it('should not update when final key is not an array', () => {
    const updatedData = swapArrayItems(data, 0, 1, ['data', 'title']);
    expect(updatedData).toEqual(data);
  });

  it('should not create path if one dose not exist', () => {
    const updatedData = swapArrayItems(data, 0, 1, ['data', 'new_key_1', 'new_key_2']);
    expect(updatedData).toEqual(data);
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
