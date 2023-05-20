import { ComponentProps } from '@lths/features/mms/ui-editor';

import { Pagination, PaginationRequest } from '../notifications/types';

export type CardViewComponentProps = ComponentProps & {
  constraint_data: any[];
  default_data: {
    title: string;
    desc: string;
    image: string;
    type: string;
    action: {
      type: string;
      page_id: string;
      page_link: string;
    };
  };
};
export type ComponentDetailResponse = {
  data: CardViewComponentProps;
};

export type ComponentListResponse = {
  data: ComponentProps[];
};

export type PagesDataRequest = PaginationRequest & Record<string, unknown>;

export type PageData = {
  id: number;
  name: string;
  type: string;
  constraints: string;
  last_editor: string;
  status: string;
  published_on?: string;
  scheduled_on?: string;
  drafted_on?: string;
};

export type PagesDataResponse = { data: PageData[]; meta: Pagination };
