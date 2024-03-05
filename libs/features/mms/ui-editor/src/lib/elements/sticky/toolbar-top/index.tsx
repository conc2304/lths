import { FC, CSSProperties, ReactNode, useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

import { Colors, TOOLBAR_PADDING } from '../../../common';
import { PAGE_EDITOR_TOOLBAR_CONTAINER } from '../../../core/containers/constants';

interface ToolbarStickyTopProps {
    containerId?: string;
    sx?: CSSProperties;
    stuckStyle?: CSSProperties;
    children?: ReactNode;
}

const ToolbarStickyTop: FC<ToolbarStickyTopProps> = ({ containerId = PAGE_EDITOR_TOOLBAR_CONTAINER, sx, stuckStyle, children }) => {

  const [ isStuck, setIsStuck ] = useState(false);
  const stickyElementRef = useRef(null);

  useEffect(() => {
    const element = document.getElementById(containerId);
    const stuckObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if(entry.boundingClientRect.top < entry.rootBounds.top) {
          setIsStuck(true)
        } else {
          setIsStuck(false)
        }
      }
    },
    {
      root: element,
      threshold: [0, 1],
    }
    
    );

    if (stickyElementRef.current) {
      stuckObserver.observe(stickyElementRef.current);
    }

    return () => {
      stuckObserver.disconnect();
    };
  }, []);

  const stickyStyle = isStuck ? 
    {
        backgroundColor: Colors.sidebar.background, 
        borderBottom: `1px solid ${Colors.sidebar.divider}`, 
        zIndex: 100, ...stuckStyle 
    }
    : 
    {...sx};
  
  return (
    <Box 
        ref={stickyElementRef}
        sx={{ 
            position: 'sticky', top: -1,
            marginLeft: -TOOLBAR_PADDING.left + 0.05, paddingLeft: TOOLBAR_PADDING.left - 0.05,
            marginRight: -TOOLBAR_PADDING.right + 0.05, paddingRight: TOOLBAR_PADDING.right - 0.05,
            marginY: -TOOLBAR_PADDING.top, paddingY: TOOLBAR_PADDING.top,
            ...(stickyStyle)
        }}
    >
        {children}
    </Box>
  
)};
export default ToolbarStickyTop;