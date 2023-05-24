import { ImagesProps } from '@lths/features/mms/data-access';

type onSelectProp = { onSelect: (url: string) => void };
type imagesProp = { images: ImagesProps[] };
export type ConnectedImageModalProps = onSelectProp & { open: boolean; onClose: () => void };
export type ImageModalProps = ConnectedImageModalProps & imagesProp;
export type ImageGalleryProps = imagesProp & onSelectProp;
