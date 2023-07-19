import { FilterGroupResponse, FilterItemResponse, FormSchema } from '@lths/types/ui-filters';

export const convertFilterResponse = (data: FilterGroupResponse[]): FormSchema[] => {
  const convertFilterItem = (filterItem: FilterItemResponse): FormSchema => {
    const { _id, name } = filterItem;
    return {
      title: name,
      id: _id,
    };
  };

  const convertFilterGroup = (filterGroup: FilterGroupResponse): FormSchema => {
    const { _id, description, filter_items } = filterGroup;
    const defaultValues = filter_items.filter(({ is_active }) => !!is_active).map(({ _id }) => _id);
    return {
      title: description,
      id: _id,
      data: [
        // hardcode everyone to a check box,
        // !! this will fail when we need to use different data types
        {
          type: 'checkbox',
          default_value: defaultValues,
          data: filter_items.map(convertFilterItem),
        },
      ],
    };
  };

  const convertedData = data.filter(({ is_active }) => !!is_active).map(convertFilterGroup);

  return convertedData;
};
