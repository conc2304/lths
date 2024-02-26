import { PageDetail } from '@lths/features/mms/data-access';

export type PageItemData = {
    page: PageDetail, isShow: boolean, isDisabled: boolean,
};

export type ConstraintsFilterValues = {
    eventConstraintType: string; 
    eventValues: OptionProp[];
    eventStateValues: OptionProp[];
    locationValues: OptionProp[];
    userValues: OptionProp[];
};

export type OptionProp = {
    name: string;
    value: string;
};