import { PageDetail } from '@lths/features/mms/data-access';

import { PageStatus, PageType } from '../../../types';

export const mockPageDetailtProps: PageDetail = {
  _id: 'mock__id',
  page_id: 'mock_page_id',
  type: PageType.PreDefined,
  name: 'mock_name',
  description: 'mock_description',
  is_variant: false,
  status: PageStatus.DRAFT,
  components_schema: [],
  default_page_id: 'mock_default_page_id',
  default_page_name: 'mock_default_page_name',
  constraints: { _id: "", events: [], locations: [], user_segments: [] },
  components: [],
};
