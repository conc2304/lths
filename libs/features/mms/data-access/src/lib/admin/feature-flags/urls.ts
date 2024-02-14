import { EnumGroup } from '../../pages/types';
import { getEnumListUrl } from '../../utils';

export const getFeatureFlagsUrl = () => getEnumListUrl(EnumGroup.FEATURE_FLAGS);
