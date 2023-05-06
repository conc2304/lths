import { ComponentProps } from '../../context/types';
import { HeroComponentProps } from '../../types/hero';
import { CardComponent, HeroComponent } from '../elements';
import { CardComponentProps } from '../elements/types';

export const componentFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case 'Hero':
      return <HeroComponent {...(props as HeroComponentProps)} />;
    case 'cCardView':
      return <CardComponent {...(props as CardComponentProps)} />;
    /*  case 'Text':
      return <TextComponent />;
    case 'Image':
      return <ImageComponent />;*/
    // Add other component types here
    default:
      return <div>Unsupported component type: ${props.component_id}</div>;
    //throw new Error(`Unsupported component type: ${props.type}`);
  }
};
