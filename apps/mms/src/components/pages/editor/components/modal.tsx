import { Dialog, DialogContent } from '@mui/material';

import ComponentGallery from './gallery';
import { ComponentModalProps } from './types';

export const ComponentModal = ({ open, onClose, components = [], onSelect }: ComponentModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <ComponentGallery components={components} onSelect={onSelect} />
      </DialogContent>
    </Dialog>
  );
};

export default ComponentModal;
