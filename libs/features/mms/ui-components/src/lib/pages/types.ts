import { FC } from 'react';

import { EnumValue } from '@lths/features/mms/data-access';
import { ComponentProps } from '@lths/features/mms/ui-editor';

export enum PageStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

export enum PageType {
  PreDefined = 'Pre-Defined',
  UserDefined = 'User-Defined',
}

export enum Constraint {
  ALL_LOCATIONS = 'ALL_LOCATIONS',
  ALL_USERS = 'ALL_USERS',
  ALWAYS = 'ALWAYS',
  SPECIFIC_DATE_TIME = 'SPECIFIC_DATE_TIME',
  SPECIFIC_EVENT_STATES = 'SPECIFIC_EVENT_STATES',
  SPECIFIC_LOCATIONS = 'SPECIFIC_LOCATIONS',
  SPECIFIC_STATES = 'SPECIFIC_STATES',
  SPECIFIC_USERS = 'SPECIFIC_USERS',
}

export type StatesData = string[];

export type EventStatesData = { events: string[]; states: string[] };

export type DateRangeData = {
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
};

export type ConstraintDateRange = {
  start_date_time: string;
  end_date_time: string;
};

type EventProp = {
  onSelect: (componentId: string) => void;
  onSelectCategory?: (category: string) => void;
  isComponentListLoading?: boolean;
  isCategoryListLoading?: boolean;
};
type ItemsProp = { components: ComponentProps[] };
type ModalProps = { open: boolean; onClose: () => void };
type FilterProps = { categories: EnumValue[]; showCategories?: boolean };
export type ComponentModalProps = EventProp & ItemsProp & ModalProps & FilterProps;

export type ConnectedComponentProps = ModalProps & {
  Modal: FC<ComponentModalProps>;
  onSelect: (componentId: string) => void;
};
export type ConnectedComponentWrapperProps = ModalProps & {
  variant: 'full' | 'basic';
  onSelect: (componentId: string) => void;
};

export type ComponentGalleryProps = EventProp & ItemsProp;

export type CreatePageModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  onCreatePage: (page_id: string) => void;
};

export type Category = {
  display_order: number;
  name: string;
  value: string;
};

export type CatergorySectionProps = {
  categories: Category[];
  isCategoryListLoading?: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};
