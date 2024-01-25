import { Box } from '@mui/material';

import { MOBILE_SCREEN_WIDTH, MOBILE_SCREEN_HEIGHT } from '../../../../common';
import colors from '../../../../common/colors';
import { ComponentProps } from '../../../../context';
import { componentFactory as factory } from '../../../factories';
import { MobileBar } from '../mobile';

import '../container.scss';

export type Props = {
  components: ComponentProps[];
};

export default function PreviewWysiwyg(props: Props) {
  const { components } = props;
  return (
    <div className="wysiwyg-container">
      <Box
        sx={{
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
          minHeight: MOBILE_SCREEN_HEIGHT,
          width: MOBILE_SCREEN_WIDTH,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.editor.mobile.background,
        }}
      >
        <Box
          sx={{
            width: MOBILE_SCREEN_WIDTH,
            backgroundColor: colors.editor.mobile.background,
            borderTopWidth: 0,
          }}
        >
          <MobileBar.Status />
          {components.map((item, index) => {
            const component = factory(item);
            const id = `preview-component-${index}`
            return (
              <div id={id} key={id}>
                {component}
              </div>
            );
          })}
        </Box>
        <MobileBar.Bottom />
      </Box>
    </div>
  );
}