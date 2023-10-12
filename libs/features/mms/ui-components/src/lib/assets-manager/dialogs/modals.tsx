import { AssetProps } from '@lths/features/mms/data-access';

import { ArchiveModal, RenameModal } from './index';

export function AssetModals({
  isRowModalOpen,
  selectedRow,
  handleDeleteRow,
  handlRenameRow,
  setIsRowModalOpen,
}: {
  isRowModalOpen: string;
  selectedRow: AssetProps;
  handleDeleteRow: () => void;
  handlRenameRow: (newName: string) => Promise<void>;
  setIsRowModalOpen: (value: string) => void;
}) {
  return (
    <>
      {isRowModalOpen === 'Delete' && (
        <ArchiveModal
          open={true}
          itemToDelete={selectedRow?.original_file_name}
          onClickKeepButton={() => setIsRowModalOpen('')}
          onClickDeleteButton={handleDeleteRow}
        />
      )}
      {isRowModalOpen === 'Rename' && (
        <RenameModal
          open={true}
          itemToRename={selectedRow?.original_file_name}
          onClickCancelButton={() => setIsRowModalOpen('')}
          onClickOkButton={handlRenameRow}
        />
      )}
    </>
  );
}
