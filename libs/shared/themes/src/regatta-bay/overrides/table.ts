import {Theme} from '@mui/material'
import { Components } from '@mui/material/styles';

export default function Table(theme: Theme): Components {
    return {
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root:nth-of-type(even)': {
                        backgroundColor: theme.palette.secondary.main,
                      },
                }
            }
        }
    }
}