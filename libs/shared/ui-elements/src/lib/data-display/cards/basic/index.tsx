import { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';

/* eslint-disable-next-line */
export interface BasicCardProps {
  action?: ReactNode;
  title?: string;
  subheader?: string;
  children?: ReactNode;
  footerdata?: ReactNode;
  footerIcon?: ReactNode;
}

export function BasicCard(props: BasicCardProps) {
  const { children, title, subheader,action , footerdata , footerIcon} = props;

  return (
    <Card sx={{ maxWidth: 378 }}>
      <CardHeader
        action={action}
        title={title}
        subheader={subheader}
      />
      <Stack alignItems="center">{children}</Stack>
      <CardActions sx={{ padding: 2 }}>
        {footerdata}
        {footerIcon}
      </CardActions>
    </Card>
  );
}

export default BasicCard;

