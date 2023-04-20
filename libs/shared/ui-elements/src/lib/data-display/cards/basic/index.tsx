import { ReactNode } from 'react';
import { SxProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

export type BasicCardProps = {
  action?: ReactNode;
  title?: string;
  subheader?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  sx?: SxProps;
};

export function BasicCard(props: BasicCardProps) {
  const { children, title, subheader, action, footer, sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader action={action} title={title} subheader={subheader} />
      <Stack alignItems="center">{children}</Stack>
      <CardActions sx={{ padding: 2 }}>{footer}</CardActions>
    </Card>
  );
}

export default BasicCard;
