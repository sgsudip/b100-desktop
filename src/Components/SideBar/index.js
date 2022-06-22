import React from "react";
import { Drawer, List, Divider, IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const SideBar = (props) => {
  const { classes, theme, handleDrawerClose, mainListItems, open } = props;
  return (
    <Drawer
      className={[classes.drawer, "sidebar"].join(" ")}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
    </Drawer>
  );
};

export default SideBar;
