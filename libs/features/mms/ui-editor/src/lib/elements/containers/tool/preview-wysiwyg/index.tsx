import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { MOBILE_SCREEN_WIDTH, TOOLBAR_PREVIEW_PADDING } from '../../../../common';
import { ComponentProps } from '../../../../context';
import { PreviewWysiwyg } from '../../../../core/containers';
import { ToolbarLabelWithClose } from '../../../../elements';
import ToolBox from '../box';

type ToolPreviewWysiwygProps = {
    title?: string;
    desc?: string;
    isStaticPage: boolean;
    image?: string;
    data: ComponentProps[];
    isLoading: boolean;
    onClose: () => void;
};

const ToolPreviewWysiwyg: React.FC<ToolPreviewWysiwygProps> = ({
    title = 'Preview',
    desc = '',
    isStaticPage,
    image,
    data,
    isLoading,
    onClose,
}) => {
    const hiddenElementRef = useRef(null);
    const previewElementRef = useRef(null);

    const [isImgLoading, setIsImgLoading] = useState(false);
    const [isImgBroken, setIsImgBroken] = useState(false);
    
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const theme = useTheme();

    useEffect(() => {
        setIsImgLoading(true);
        setIsImgBroken(false);
        if (!image) {
            setIsImgLoading(false);
            setIsImgBroken(true);
        }
    }, [image]);

    const handleImgLoad = () => {
        setIsImgLoading(false);
        setIsImgBroken(false);
    }

    const handleImgError = () => {
        setIsImgLoading(false);
        setIsImgBroken(true);
    }

    useEffect(() => {
        const hiddenElementObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        const previewElementObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });

    
        if (hiddenElementRef.current) {
            hiddenElementObserver.observe(hiddenElementRef.current);
        }

        if (previewElementRef.current) {
            previewElementObserver.observe(previewElementRef.current);
        }

        return () => {
            hiddenElementObserver.disconnect();
            previewElementObserver.disconnect();
        };
    }, [isStaticPage]);

    return (
        <ToolBox 
            style={{
                paddingTop: theme.spacing(TOOLBAR_PREVIEW_PADDING.top), 
                paddingBottom: theme.spacing(TOOLBAR_PREVIEW_PADDING.bottom),
                paddingLeft: theme.spacing(TOOLBAR_PREVIEW_PADDING.left),
                paddingRight: theme.spacing(TOOLBAR_PREVIEW_PADDING.right),

            }} 
            id={`Toolbar_Preview_Wysiwyg`} aria-label="Toolbar Preview Wysiwyg"
        >
            <ToolbarLabelWithClose label={title} onClose={onClose} />
            <Box>
                <Typography color="text.secondary" sx={{ fontSize: 12, paddingBottom: 1 }}>{desc}</Typography>
                { isStaticPage ? 
                    (isImgBroken ? 
                        <Typography color="text.secondary" sx={{ fontSize: 12, paddingBottom: 1 }}>preview is not available</Typography>
                        :
                        <>
                            <img 
                                src={image} alt={'preview is not available'}
                                onLoad={handleImgLoad} onError={handleImgError} 
                                style={{ 
                                    width: "100%", borderRadius: '8px', 
                                    display: isImgLoading ? "none" : "unset" 
                                }} 
                            />
                            { isImgLoading &&
                                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 1 }}>
                                    <CircularProgress size={150} color="primary" />
                                </Box>
                            }
                        </>
                    )
                :
                    <>
                        <Box ref={hiddenElementRef} />
                        <Box sx={{ width: MOBILE_SCREEN_WIDTH, height: `${(width / MOBILE_SCREEN_WIDTH) * height}px` }}>
                            <Box ref={previewElementRef} 
                                sx={{ transform: `scale(${ width / MOBILE_SCREEN_WIDTH })`, transformOrigin: 'top left', borderRadius: 2, overflow: 'hidden' }}
                            >
                                <PreviewWysiwyg components={data} isLoading={isLoading} />  
                            </Box>
                        </Box>
                    </>
                }
            </Box>
        </ToolBox>  
    );
};

export default ToolPreviewWysiwyg;