import { useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import { PageHeader } from '@lths/shared/ui-layouts';
import { getUniqueValuesByKey } from '@lths/shared/utils';

import { FeatureFlag, FlagCRUDMethods } from '../../types';
import { FeatureFlagTable } from '../filterable-table';
import { FeatureFlagFormModal } from '../form-modal/feature-flag-form-modal';

type FeatureFlagManagerProps = {
  featureFlags: FeatureFlag[];
  // api enum values are not posted, just patched with the entire enum group content
  onUpdateFlags?: (flags: FeatureFlag, mode: FlagCRUDMethods) => void;
};

export const FeatureFlagManager = (props: FeatureFlagManagerProps) => {
  const { featureFlags = [], onUpdateFlags: onUpdate } = props;

  // State
  const availableModules = useMemo(() => {
    return getUniqueValuesByKey(featureFlags, 'module');
  }, [featureFlags]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formFeatureValues, setFormFeatureValues] = useState<FeatureFlag | null>(null);

  // Handlers
  const handleOnEditFlagClick = (flagData: FeatureFlag) => {
    setCreateModalOpen(false);
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setFormFeatureValues(flagData);
  };
  const handleOnDeleteFlagClick = (flagData: FeatureFlag) => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setFormFeatureValues(flagData);
  };

  const handleCreateFlag = (flagData: FeatureFlag, mode: FlagCRUDMethods) => {
    // check if flag with same id already exists and prevent creation
    const flagExists = featureFlags.some((f) => f.id === flagData.id);

    if (flagExists)
      return Promise.reject({
        errors: [
          { field: 'form', msg: 'Event with that ID and Module already exist.' },
          { field: 'title', msg: 'Duplicate flag name.' },
        ],
      });

    handleOnSubmit(flagData, mode);
  };

  const handleOnSubmit = (flagData: FeatureFlag, mode: FlagCRUDMethods) => {
    onUpdate && onUpdate(flagData, mode);
  };

  return (
    <Box
      className="MMS-Schedule-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader
        title="Feature Flags"
        sx={{ mt: '1rem', mb: '3.5rem' }}
        rightContent={
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              onClick={() => {
                setEditModalOpen(false);
                setCreateModalOpen(true);
              }}
              variant="contained"
              startIcon={<Add />}
              role="button"
              name="New Flag"
            >
              New Flag
            </Button>
          </Stack>
        }
      />
      <Box>
        <FeatureFlagTable
          featureFlags={featureFlags}
          onEditFlagClick={handleOnEditFlagClick}
          onDeleteFlagClick={handleOnDeleteFlagClick}
        />
      </Box>
      <>
        <FeatureFlagFormModal
          mode="create"
          open={createModalOpen}
          availableModules={availableModules}
          onClose={() => setCreateModalOpen(false)}
          formValues={null}
          onSubmit={handleCreateFlag}
          data-testid="CreateFlag--modal"
        />

        {formFeatureValues && (
          <FeatureFlagFormModal
            mode="update"
            open={editModalOpen}
            availableModules={availableModules}
            onClose={() => {
              setEditModalOpen(false);
              setFormFeatureValues(null);
            }}
            formValues={formFeatureValues}
            onSubmit={handleOnSubmit}
          />
        )}

        {formFeatureValues && (
          <FeatureFlagFormModal
            mode="delete"
            open={deleteModalOpen}
            availableModules={availableModules}
            onClose={() => {
              setDeleteModalOpen(false);
              setFormFeatureValues(null);
            }}
            formValues={formFeatureValues}
            onSubmit={handleOnSubmit}
          />
        )}
      </>
    </Box>
  );
};
