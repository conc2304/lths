import { SelectOptionInternal, SelectOptionProp } from './types';

export const normalizeOption = (option: SelectOptionProp): SelectOptionInternal => {
  if (Array.isArray(option)) {
    return option;
  } else if (typeof option === 'object' && option.id && option.value) {
    return [option.id, option.value];
  }

  throw new Error(
    'Invalid Option: options should be either Array<[id: string, label: string | number]> or Array<{id: string|number, label: string | number}'
  );
};
