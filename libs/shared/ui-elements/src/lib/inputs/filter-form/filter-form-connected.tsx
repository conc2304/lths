import { withFilterFormStateContext } from '@lths/shared/ui-filters';

import { FilterForm } from './';

export const ConnectedFilterForm = withFilterFormStateContext(FilterForm);
