import { useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import { PageHeader } from '@lths/shared/ui-layouts';
import { getUniqueValuesByKey } from '@lths/shared/utils';

import { FeatureFlag } from '../../types';
import { FeatureFlagTable } from '../filterable-table';
import { FeatureFlagFormModal } from '../form-modal/feature-flag-form-modal';

type FeatureFlagManagerProps = {
  featureFlags: FeatureFlag[];
  onUpdateFlags?: (flags: FeatureFlag) => void; // api enum values are not posted, just patched with the entire enum group content
};

export const FeatureFlagManager = (props: FeatureFlagManagerProps) => {
  const { featureFlags, onUpdateFlags: onUpdate } = props;

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

  const handleOnSubmit = (flagData: FeatureFlag) => {
    onUpdate && onUpdate(flagData);
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
            >
              NEW FLAG
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
          onSubmit={handleOnSubmit}
        />

        {formFeatureValues && (
          <FeatureFlagFormModal
            mode="edit"
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
