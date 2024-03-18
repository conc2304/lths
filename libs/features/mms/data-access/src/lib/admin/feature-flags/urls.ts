import { EnumGroup } from '../../types';
import { getEnumListUrl } from '../../utils';

export const getFeatureFlagsUrl = () => getEnumListUrl(EnumGroup.FEATURE_FLAGS);
export const updateFeatureFlagsUrl = (id: string) => getEnumListUrl(id);
