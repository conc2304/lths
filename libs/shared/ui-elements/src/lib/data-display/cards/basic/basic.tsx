import { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

/* eslint-disable-next-line */
export interface ChartCardProps {
  action?: ReactNode;
  title?: string;
  subheader?: string;
  children?: ReactNode;
}

export function ChartCard(props: ChartCardProps) {
  const { children, title, subheader,action } = props;

  return (
    <Card>
      <CardHeader
        action={action}
        title={title}
        subheader={subheader}
      />
      <Stack alignItems="center">{children}</Stack>
    </Card>
  );
}

export default ChartCard;

