import { FC } from 'react';

import { EnumValue } from '@lths/features/mms/data-access';
import { ComponentProps } from '@lths/features/mms/ui-editor';

type EventProp = {
  onSelect: (componentId: string) => void;
  onSelectCategory?: (category: string) => void;
  isComponentListLoading?: boolean;
  isCategoryListLoading?: boolean;
};
type ItemsProp = { components: ComponentProps[]; categories?: EnumValue[] };
type ModalProps = { open: boolean; onClose: () => void };
type FilterProps = { defaultCategory?: string; showCategories?: boolean };
export type ComponentModalProps = EventProp & ItemsProp & ModalProps & FilterProps;

export type ConnectedComponentProps = ModalProps &
  FilterProps & {
    Modal: FC<ComponentModalProps>;
    onSelect: (componentId: string) => void;
  };
export type ConnectedComponentWrapperProps = ModalProps &
  FilterProps & {
    variant: 'full' | 'basic';
    onSelect: (componentId: string) => void;
  };

export type ComponentGalleryProps = EventProp & ItemsProp;

export type ComponentGalleryItemProps = {
  component: ComponentProps;
  onSelect: (componentId: string) => void;
  index: number;
};

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
