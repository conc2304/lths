import { ComponentProps } from '../../context';

export type HeroComponentProps = ComponentProps & {
  imageUrl: string;
  title: string;
};
