import React from 'react';
import { SafetyCheck } from '@mui/icons-material';
import { Input } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import { MyType } from './type';

import styles from './toaster.module.css';

type test = Record<string, unknown>;

//TODO: use mui theming
export const LayoutToaster: React.FC = () => {
  const test = true;

  return (
    <Toaster
      toastOptions={{
        style: { fontWeight: 'bold' },
        success: {
          style: {
            background: 'green',
            color: 'white',
          },
        },
        error: {
          style: {
            background: 'red',
            color: 'white',
          },
        },
      }}
    />
  );
};
