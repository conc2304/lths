import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';

const Assets = {
  items: [
    {
      title: 'Assets',
      icon: <CloudUploadRoundedIcon />,
      path: '/assets',
      file: '/assets/list',
    },
    // TODO - this page is for testing the signed url asset upload
    // TODO - replace with regular lists page after we have signed url workding
    {
      title: 'Assets',
      icon: <CloudUploadRoundedIcon />,
      path: '/assets-testing',
      file: '/assets/list-testing',
      hidden: true,
    },
  ],
};

export default Assets;
