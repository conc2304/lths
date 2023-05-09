import { ComponentProps } from '../../context/types';
import { CardComponent, HeroComponent, HeaderComponent, UnsupportedComponent, ButtonComponent } from '../components';
import {
  ButtonComponentProps,
  CardComponentProps,
  HeaderComponentProps,
  HeroComponentProps,
} from '../components/types';

export const componentFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case 'cQuickLinkView':
      return <HeroComponent {...(props as HeroComponentProps)} />;
    case 'cCardView':
      return <CardComponent {...(props as CardComponentProps)} />;
    case 'cHeader':
      return <HeaderComponent {...(props as HeaderComponentProps)} />;
    case 'cButton':
      return <ButtonComponent {...(props as ButtonComponentProps)} />;

    default:
      return <UnsupportedComponent {...props} />;
    //return <div>Unsupported component type: ${props.component_id}</div>;
    //throw new Error(`Unsupported component type: ${props.type}`);
  }
};
