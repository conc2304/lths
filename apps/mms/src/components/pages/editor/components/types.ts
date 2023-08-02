import { FC } from 'react';

import { ComponentProps } from '@lths/features/mms/ui-editor';

type EventProp = { onSelect: (componentId: string) => void; onSelectCategory?: (category: string) => void };
type ItemsProp = { components: ComponentProps[] };
type ModalProps = { open: boolean; onClose: () => void };
export type ComponentModalProps = EventProp & ItemsProp & ModalProps;

export type ConnectedComponentProps = ModalProps & { Modal: FC<ComponentModalProps> };
export type ConnectedComponentWrapperProps = ModalProps & { variant: 'full' | 'basic' };

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
  onSelectCategory: (category: string) => void;
};
