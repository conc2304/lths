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
          onClickKeepButton={() => setModalState(null)}
          onClickDeleteButton={handleDeleteRow}
        />
      )}
      {assetModalType === 'Rename' && (
        <RenameModal
          open={true}
          itemToRename={selectedRow?.original_file_name}
          onClickCancelButton={() => setModalState(null)}
          onClickOkButton={handlRenameRow}
        />
      )}
    </>
  );
}
