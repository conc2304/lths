import { ComponentProps } from '../../context/types';
import { CardComponent, HeroComponent } from '../components';
import { CardComponentProps, HeroComponentProps } from '../components/types';

export const componentFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case 'cQuickLinkView':
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
