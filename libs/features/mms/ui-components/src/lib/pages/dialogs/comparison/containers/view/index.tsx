import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { PageDetail } from '@lths/features/mms/data-access';
import { PreviewWysiwyg, MOBILE_SCREEN_WIDTH } from '@lths/features/mms/ui-editor';

import PreviewHeader from './header';

interface ViewPreviewProps {
    pageList: PageDetail[];
    showConstraints?: boolean;
}

export default function ViewPreview({ pageList, showConstraints = true }: ViewPreviewProps) {
    const theme = useTheme();

    const rowStyle = { marginLeft: 'auto', paddingLeft: theme.spacing(4), marginRight: 'auto', paddingRight: theme.spacing(4) }

    return (
        <Stack direction="column" sx={{ paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4) }}>
            <Stack direction="row" spacing={4} sx={rowStyle}>
            {
                pageList.map((item, index) => (
                    <div key={`preview_wysiwyg_header_${index}`} style={{ width: MOBILE_SCREEN_WIDTH }}>
                        <PreviewHeader page={item} showConstraints={showConstraints}/>
                    </div>
                ))
            }
            </Stack>
            <Stack direction="row" spacing={4} sx={rowStyle}>
            { 
                pageList.map((item, index) => (
                    <div key={`preview_wysiwyg_${index}`}>
                        <PreviewWysiwyg components={item.components}/>
                    </div>
                ))
            }
            </Stack>
        </Stack>
    );
}