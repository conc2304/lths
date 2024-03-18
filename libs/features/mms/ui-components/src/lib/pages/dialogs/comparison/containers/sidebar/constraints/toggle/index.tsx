import { ChangeEvent } from 'react';
import { Stack, Typography, Switch } from '@mui/material';

interface ConstraintsToggleProps {
    showConstraints: boolean;
    onShowConstraintsChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ConstraintsToggle(props: ConstraintsToggleProps) {
    const { showConstraints, onShowConstraintsChange } = props;

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" padding={2}>
            <Typography variant="h5">Constraints</Typography>
            <Switch
                checked={showConstraints}
                onChange={onShowConstraintsChange}
            />
        </Stack>
    );
}