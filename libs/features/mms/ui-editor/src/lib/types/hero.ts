import { ToolbarProps } from './core';

import type { ComponentProps } from '../context';
export type HeroComponentProps = ComponentProps & {
  imageUrl: string | null;
  title: string | null;
};
export type onChangeProp = (prop: { [key: string]: any }) => void;
export type ToolbarEventProps = {
  onChange: onChangeProp;
};
export type HeroToolbarProps = ToolbarEventProps &
  ToolbarProps & {
    imageUrl: string | null;
    title: string | null;
  };
