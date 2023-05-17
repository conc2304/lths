import { Pagination, PaginationRequest } from '../notifications/types';

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
