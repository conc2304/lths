import { TableColumnHeader } from '@lths/shared/ui-elements';

export const FtFlagTableHeaders: TableColumnHeader[] = [
  {
    id: 'module',
    label: 'module',
    sortable: true,
  },
  {
    id: 'title',
    label: 'title',
    sortable: true,
  },
  {
    id: 'description',
    label: 'description',
    sortable: true,
  },
  {
    id: 'enabled',
    label: 'enabled',
    sortable: true,
    align: 'center',
  },
  {
    id: 'edit',
    label: '',
    sortable: false,
    align: 'center',
    width: '35px',
  },
  {
    id: 'delete',
    label: '',
    sortable: false,
    align: 'center',
    width: '35px',
  },
];
