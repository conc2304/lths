import { ComponentProps } from '../../context/types';
import { HeroComponentProps } from '../../types/hero';
import { HeroComponent } from '../elements';

export const componentFactory = (props: ComponentProps) => {
  switch (props.type) {
    case 'Hero':
      return <HeroComponent {...(props as HeroComponentProps)} />;
    /*  case 'Text':
      return <TextComponent />;
    case 'Image':
      return <ImageComponent />;*/
    // Add other component types here
    default:
      throw new Error(`Unsupported component type: ${props.type}`);
  }
};
