/*MIT License

Copyright (c) 2018 CodedThemes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import PropTypes from 'prop-types';

import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import SimpleBar from 'simplebar-react';
import { BrowserView, MobileView } from 'react-device-detect';

const RootStyle = styled(BrowserView)({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden'
});

// scroll bar wrapper
const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
        '&:before': {
            backgroundColor: alpha(theme.palette.grey[500], 0.48)
        },
        '&.simplebar-visible:before': {
            opacity: 1
        }
    },
    '& .simplebar-track.simplebar-vertical': {
        width: 10
    },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
        height: 6
    },
    '& .simplebar-mask': {
        zIndex: 'inherit'
    }
}));


export default function SimpleBarScroll({ children, sx, ...other }) {
    return (
        <>
            <RootStyle>
                <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
                    {children}
                </SimpleBarStyle>
            </RootStyle>
            <MobileView>
                <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
                    {children}
                </Box>
            </MobileView>
        </>
    );
}

SimpleBarScroll.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object
};
