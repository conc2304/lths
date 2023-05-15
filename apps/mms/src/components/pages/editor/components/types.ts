import { FC } from 'react';

import { ComponentProps } from '@lths/features/mms/ui-editor';

export type ComponentModalProps = {
  open: boolean;
  components: ComponentProps[];
  onClose: () => void;
  onSelectComponent: (componentId: string) => void;
};

export type ConnectedComponentProps = { open: boolean; onClose: () => void; Modal: FC<ComponentModalProps> };
export type ConnectedComponentWrapperProps = { open: boolean; onClose: () => void; variant: 'full' | 'basic' };

export type ComponentGalleryProps = {
  components: ComponentProps[];
  onSelectComponent: (componentId: string) => void;
};
