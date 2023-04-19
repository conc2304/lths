import { withFilterFormStateContext } from '@lths/shared/ui-filters';
import { FormChildren } from 'libs/shared/ui-elements/src/lib/inputs/vertical-form-group/form-children';

export const ConnectedFormChildren = withFilterFormStateContext(FormChildren);
