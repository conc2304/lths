import React, { HTMLAttributes, SyntheticEvent } from 'react';
import { TextField, Checkbox, SxProps } from '@mui/material';
import Autocomplete, { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';

import { OptionProp } from '../../../../types';

interface ConstraintsAutocompleteProps {
    label: string;
    values: OptionProp[];
    onChange: (values: OptionProp[]) => void;
    options: OptionProp[];
    sx?: SxProps;
};

const ConstraintsAutocomplete = ({ label, values, onChange, options, sx }: ConstraintsAutocompleteProps) => {
    const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: OptionProp, state: AutocompleteRenderOptionState) => {
        return (
            <li {...props}>
                <Checkbox checked={state.selected} sx={{ marginRight: 1 }}/>
                {option.name}
            </li>
        );
    };

    const handleChange = (
        event: SyntheticEvent<Element, Event>,
        item: OptionProp[],
    ) => { 
        onChange(item)
    };

    return (
        <Autocomplete
            sx={sx}
            multiple limitTags={2} fullWidth={true}
            value={values}
            options={options}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label={label} placeholder={label}/>}
            onChange={handleChange}
            renderOption={renderOption}
        />
    );
};

export default ConstraintsAutocomplete;