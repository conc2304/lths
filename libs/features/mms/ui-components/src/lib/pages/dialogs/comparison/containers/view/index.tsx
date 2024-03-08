import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { PageDetail } from '@lths/features/mms/data-access';
import { PreviewWysiwyg, MOBILE_SCREEN_WIDTH } from '@lths/features/mms/ui-editor';

import PreviewHeader from './header';
import { PageComponentsLookup } from '../../../../../hooks';

interface ViewPreviewProps {
    pageList: PageDetail[];
    pageComponentsLookup: PageComponentsLookup;
    showConstraints?: boolean;
}

export default function ViewPreview({ pageList, pageComponentsLookup, showConstraints = true }: ViewPreviewProps) {
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
                pageList.map((item, index) => {
                    const pageComponents = pageComponentsLookup[item.page_id];
                    let loading = pageComponents ? pageComponents.loading : false;
                    let components = pageComponents ? pageComponents.components : [];
                    if(item.components) {
                        loading = false;
                        components = item.components;
                    }

                    return (
                        <div key={`preview_wysiwyg_${index}`}>
                            <PreviewWysiwyg components={components} isLoading={loading}/>
                        </div>
                    )
                }
                )
            }
            </Stack>
        </Stack>
    );
}