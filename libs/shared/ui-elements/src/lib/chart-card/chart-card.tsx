import { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import styles from './chart-card.module.css';

/* eslint-disable-next-line */
export interface ChartCardProps {
  title?: string;
  subheader?: string;
  children?: ReactNode;
}

export function ChartCard(props: ChartCardProps) {
  const { children, title, subheader } = props;

  return (
    <div className={styles['container']}>
      <h1>Welcome to ChartCard!</h1>
      <Card sx={{ maxWidth: 378, height: 436 }}>
        <CardHeader
          action={
            <IconButton aria-label="info-icon">
              <InfoOutlinedIcon />
            </IconButton>
          }
          title={title}
          subheader={subheader}
        />
        <Stack alignItems="center">{children}</Stack>
      </Card>
    </div>
  );
}

export default ChartCard;
