import React, { useState, useEffect, useRef, ReactNode } from 'react';
import {
    Drawer,
    Typography,
    Paper,
} from '@mui/material';
import { Box, Toolbar } from '@mui/material';
import {ChevronLeft, ChevronRight} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';

type PageContentWrapperProps = {
    open: boolean;
    drawerwidth: number;
    children?: ReactNode;
};

const PageContentWrapper = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<PageContentWrapperProps>(
({ theme, open, drawerwidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerwidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  ...theme.mixins.toolbar,
  justifyContent: 'space-between', 
  padding: theme.spacing(2, 3),
  paddingRight: theme.spacing(2),
}));

const truncateMiddle = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const midpoint = Math.floor(maxLength / 2);
    const left = text.slice(0, midpoint);
    const right = text.slice(-midpoint);
    return left + '...' + right;
  };

export type PageContentWithRightDrawerProps = {
    open: boolean;
    handleDrawerClose: () => void;
    drawerWidth?: number;
    title?: string;
    maxTitleLength?: number;
    customDrawerHeader?: ReactNode;
    drawerContent?: ReactNode;
    children?: ReactNode;
};
  
export const PageContentWithRightDrawer = (props : PageContentWithRightDrawerProps) => {
    const theme = useTheme();
    const { open, drawerWidth = 371, handleDrawerClose, title, maxTitleLength = 22, customDrawerHeader, drawerContent, children} = props;
    const scrollbarRef = useRef(null);
    const [hasScrollbar, setHasScrollbar] = useState(false);

    const updateElevation = () => {
        if (scrollbarRef.current) {
            const { scrollHeight, clientHeight } = scrollbarRef.current;
            const scrollbarPresent = scrollHeight > clientHeight;
            setHasScrollbar(scrollbarPresent);
          }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleDrawerClose();
        }
      };
    
    useEffect(() => {
        updateElevation();
        window.addEventListener('resize', updateElevation);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.addEventListener('keydown', handleEscapeKey);
            window.removeEventListener('resize', updateElevation);
        };
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <PageContentWrapper open={open} drawerwidth={drawerWidth}>
                {children}
            </PageContentWrapper>
            <Drawer
                data-testid="Right Drawer"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    pointerEvents: open ? "auto": "none",
                    '& .MuiDrawer-paper': {
                        width: drawerWidth, borderRadius: 0,
                        zIndex: 1, boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >  
                <Toolbar />
                <div ref={scrollbarRef} style={{overflow: 'auto'}}>
                    <Paper 
                        sx={{
                                borderRadius: 0, position: "sticky",
                                top: "0", zIndex: 1, width: "100%",
                                ...(!hasScrollbar && {boxShadow: "none"})
                            }}
                    >
                        {customDrawerHeader ? (customDrawerHeader) 
                        : 
                        (<DrawerHeader>
                            <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: theme.spacing(3) }}>
                                {title && truncateMiddle(title, maxTitleLength)}
                            </Typography>
                            <IconButton aria-label="Close Drawer" onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronLeft sx={{ fontSize: theme.spacing(4) }}/> : <ChevronRight sx={{ fontSize: theme.spacing(4) }}/>}
                            </IconButton>
                        </DrawerHeader>)
                        }
                    </Paper>
                    {drawerContent}
                </div>
            </Drawer>
        </Box>
    );
}