import { ComponentProps } from '@lths/features/mms/ui-editor';

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
