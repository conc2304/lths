import React, { HTMLAttributes, SyntheticEvent } from 'react';
import { TextField, Checkbox, SxProps } from '@mui/material';
import Autocomplete, { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';

export type OptionProp = {
    name: string;
    value: string;
};

interface ConstraintsAutocompleteProps {
    label: string;
    values: OptionProp[];
    setValues: (values: OptionProp[]) => void;
    options: OptionProp[];
    sx?: SxProps;
};

const ConstraintsAutocomplete = ({ label, values, setValues, options, sx }: ConstraintsAutocompleteProps) => {
    const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: OptionProp, state: AutocompleteRenderOptionState) => {
        return (
            <li {...props}>
                <Checkbox checked={state.selected} sx={{ marginRight: 1 }}/>
                {option.name}
            </li>
        );
    };

    const handleValuesChange = (
        event: SyntheticEvent<Element, Event>,
        item: OptionProp[],
    ) => { 
        setValues(item)
    };

    return (
        <Autocomplete
            sx={sx}
            multiple limitTags={2} fullWidth={true}
            value={values}
            options={options}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label={label} placeholder={label}/>}
            onChange={handleValuesChange}
            renderOption={renderOption}
        />
    );
};

export default ConstraintsAutocomplete;