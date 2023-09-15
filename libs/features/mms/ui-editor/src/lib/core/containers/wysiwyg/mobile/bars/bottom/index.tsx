import Box from '@mui/system/Box';

import BottomBarSvg from '../../../../../../../assets/iphone-bottom-bar.svg';
import colors from '../../../../../../common/colors';

const BottomBar = () => {
  return (
    <Box sx={{ backgroundColor: colors.editor.mobile.background, width: '100%', marginTop: 'auto' }}>
      <img src={BottomBarSvg} alt="Bottom Bar" />
    </Box>
  );
};
export default BottomBar;
