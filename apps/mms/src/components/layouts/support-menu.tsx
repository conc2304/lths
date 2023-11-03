import { Box, Divider, Link, LinkProps, List, ListItem } from '@mui/material';

const StyledLink = (props: LinkProps) => (
  <Link
    variant="body1"
    underline="hover"
    rel="noopener"
    target="_blank"
    // use react router link component if we are routing internally, else use an anchor tag
    component="a"
    color="inherit"
    sx={{ cursor: 'pointer' }}
    {...props}
  />
);

// TODO - we have no idea where these links go - need to add href or internal routing depending on where they go
export const SupportMenu = () => {
  return (
    <Box data-testid="Support-Menu--root">
      <List>
        <ListItem>
          <StyledLink>Help</StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink>Training</StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink>Updates</StyledLink>
        </ListItem>
        <Divider />
        <ListItem>
          <StyledLink>Terms and Policy</StyledLink>
        </ListItem>
        <Divider />
        <ListItem>
          <StyledLink>Send feedback to Google</StyledLink>
        </ListItem>
      </List>
    </Box>
  );
};
