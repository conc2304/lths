import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

import { DRAWER_WIDTH } from "../config";

const DrawerMiniScreenStyled = styled(Drawer)(({ theme }) => ({
  display: { xs: "block", lg: "none" },//TODO: getting type error??
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: DRAWER_WIDTH,
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundImage: "none",
    boxShadow: "inherit",
  },
}));
export default DrawerMiniScreenStyled;
