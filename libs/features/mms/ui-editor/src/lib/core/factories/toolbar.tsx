import { ToolbarProps } from '../../types';
import { HeroToolbarProps } from '../../types/hero';
import ToolbarComponent from '../elements/hero/toolbar';

export const toolbarFactory = (props: ToolbarProps) => {
  switch (props.type) {
    case 'Hero':
      return <ToolbarComponent {...(props as HeroToolbarProps)} />;
    /*  case 'Text':
      return <TextComponent />;
    case 'Image':
      return <ImageComponent />;*/
    // Add other component types here
    default:
      throw new Error(`Unsupported component type: ${props.type}`);
  }
};
