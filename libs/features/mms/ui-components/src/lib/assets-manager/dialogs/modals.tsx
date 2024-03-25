import { AssetProps } from '@lths/features/mms/data-access';

import { ArchiveModal, RenameModal } from './index';

export function AssetModals({
  assetModalType,
  selectedRow,
  handleDeleteRow,
  handlRenameRow,
  setModalState,
}: {
  assetModalType: 'Delete' | 'Rename' | null;
  selectedRow: AssetProps;
  handleDeleteRow: () => void;
  handlRenameRow: (newName: string) => Promise<void>;
  setModalState: (value: 'Delete' | 'Rename' | null) => void;
}) {
  return (
    <>
      {assetModalType === 'Delete' && (
        <ArchiveModal
          open={true}
          itemToDelete={selectedRow?.original_file_name}
          onCancel={() => setModalState(null)}
          onConfirm={handleDeleteRow}
        />
      )}
      {assetModalType === 'Rename' && (
        <RenameModal
          open={true}
          itemToRename={selectedRow?.original_file_name}
          onCancel={() => {
            console.log('CANCEL');
            setModalState(null);
          }}
          onConfirm={handlRenameRow}
        />
      )}
    </>
  );
}
