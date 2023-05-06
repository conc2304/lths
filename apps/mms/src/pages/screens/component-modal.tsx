import { Dialog, DialogContent } from '@mui/material';

export type ComponentModalProps = {
  open: boolean;
};

export const ComponentModal = ({ open }: ComponentModalProps) => {
  return (
    <Dialog open={open} aria-labelledby="filter-dialog-title" className="FilterForm--Dailog" maxWidth="md" fullWidth>
      <DialogContent></DialogContent>
    </Dialog>
  );
};
