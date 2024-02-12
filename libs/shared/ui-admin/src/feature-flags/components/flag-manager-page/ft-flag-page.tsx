import { useState } from 'react';
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
  console.log({ sharedPageFlags: featureFlags });

  // State
  const availableModules = getUniqueValuesByKey(featureFlags, 'module').map((value, i) => [i, value]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formFeatureValues, setFormFeatureFlag] = useState<FeatureFlag | undefined>(undefined);

  // Handlers
  const handleOnEditFlagClick = (flagData: FeatureFlag) => {
    setFormFeatureFlag(flagData);
    setModalOpen(true);
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
            <Button onClick={() => setModalOpen(true)} variant="contained" startIcon={<Add />}>
              NEW FLAG
            </Button>
          </Stack>
        }
      />
      <Box>
        <FeatureFlagTable featureFlags={featureFlags} onEditFlagClick={handleOnEditFlagClick} />
      </Box>
      <FeatureFlagFormModal
        open={modalOpen}
        availableModules={availableModules.map(([, label]) => label.toString())}
        onClose={() => setModalOpen(false)}
        formValues={formFeatureValues}
        onSubmit={handleOnSubmit}
      />
    </Box>
  );
};
