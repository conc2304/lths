

import { Toaster } from 'react-hot-toast';
import styles from './toaster.module.css';

//TODO: use mui theming
export const LayoutToaster:React.FC = () => {
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
