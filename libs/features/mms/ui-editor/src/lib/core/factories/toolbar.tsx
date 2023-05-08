import { ComponentProps } from '../../context';
import { CardToolbar, HeroToolbar, CardComponentProps, HeroComponentProps } from '../components';

export const toolbarFactory = (props: ComponentProps) => {
  console.log('🚀 ~ file: toolbar.tsx:5 ~ toolbarFactory ~ props:', props);

  switch (props.component_id) {
    case 'cQuickLinkView':
      return <HeroToolbar {...(props as HeroComponentProps)} />;
    case 'cCardView':
      return <CardToolbar {...(props as CardComponentProps)} />;
    /*  case 'Text':
      return <TextComponent />;
    case 'Image':
      return <ImageComponent />;*/
    // Add other component types here
    //return defaultComponent here???
    default:
      return <div>Unsupported component type: ${props.component_id}</div>;
    // throw new Error(`Unsupported component type: ${props.type}`);
  }
};
