import { FC } from 'react';

import { ComponentProps } from '@lths/features/mms/ui-editor';

type EventProp = {
  onSelect: (componentId: string) => void;
  onSelectCategory?: (category: string) => void;
  isComponentListLoading?: boolean;
};
type ItemsProp = { components: ComponentProps[] };
type ModalProps = { open: boolean; onClose: () => void };
export type ComponentModalProps = EventProp & ItemsProp & ModalProps;

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
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};
