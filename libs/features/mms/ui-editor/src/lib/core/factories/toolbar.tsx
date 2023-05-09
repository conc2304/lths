import { ComponentProps } from '../../context';
import {
  CardToolbar,
  HeroToolbar,
  CardComponentProps,
  HeroComponentProps,
  UnsupportedToolbar,
  HeaderToolbar,
  HeaderComponentProps,
  ButtonToolbar,
  ButtonComponentProps,
} from '../components';

export const toolbarFactory = (props: ComponentProps) => {
  console.log('🚀 ~ file: toolbar.tsx:5 ~ toolbarFactory ~ props:', props);

  switch (props.component_id) {
    case 'cQuickLinkView':
      return <HeroToolbar {...(props as HeroComponentProps)} />;
    case 'cCardView':
      return <CardToolbar {...(props as CardComponentProps)} />;
    case 'cHeader':
      return <HeaderToolbar {...(props as HeaderComponentProps)} />;
    case 'cButton':
      return <ButtonToolbar {...(props as ButtonComponentProps)} />;

    default:
      return <UnsupportedToolbar {...props} />;
    // return <div>Unsupported component type: ${props.component_id}</div>;
    // throw new Error(`Unsupported component type: ${props.type}`);
  }
};
