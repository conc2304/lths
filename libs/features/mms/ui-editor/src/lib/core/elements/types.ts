import { ComponentProps } from '../../context';
/**NOTE: WE MAY HAVE TO RELAX ON THE NAMING CONVENTION HERE, SO THAT WE CAN FOLLOW EXACT JSON NAMES

*/
export type HeroComponentProps = ComponentProps & {
  imageUrl: string;
  title: string;
};
export type CardComponentProps = ComponentProps & {
  default_data: {
    image: string;
    title: string;
    desc: string;
    type: string;
  };
};
