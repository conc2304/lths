import { Stack, Paper, Typography, Link, Tooltip } from '@mui/material';
import { Star, Filter } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { PageDetail } from '@lths/features/mms/data-access';

export interface PreviewHeaderProps {
    page: PageDetail;
    showConstraints?: boolean
}

export default function PreviewHeader({ page, showConstraints = true }: PreviewHeaderProps) {
    const { name, is_variant, page_id, constraints_formatted } = page;

    const theme = useTheme();
    const isDefault = !is_variant;

    return (
        <Paper
            sx={{ 
                padding: theme.spacing(2), paddingTop: theme.spacing(1), paddingBottom: theme.spacing(1),
                minHeight: theme.spacing(4), height: '100%',
                borderRadius: 0, boxShadow: 'none',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                { isDefault &&
                    <Tooltip title={"default page"} arrow placement="bottom-start">
                        <Star sx={{ fontSize: 32 }}/>
                    </Tooltip>
                }
                <Stack direction="column">
                    <Typography variant="h4">{name}</Typography>
                    <Link 
                        component={RouterLink} to={`/pages/editor/${page_id}`} target="_blank" 
                        color="text.secondary" underline="hover" variant="h5"
                    >
                        {page_id}
                    </Link>
                </Stack>
            </Stack>
            { showConstraints && 
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ paddingTop: theme.spacing(1)}}>
                    <Tooltip title={"constraints"} arrow placement="bottom-start">
                        <Filter fontSize="small" />
                    </Tooltip>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>{constraints_formatted || ''}</Typography> 
                </Stack>
            }
        </Paper>
    );
}