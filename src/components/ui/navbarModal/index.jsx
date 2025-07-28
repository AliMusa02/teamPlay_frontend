import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import {
  PanelRightCloseIcon,
  PanelTopCloseIcon,
  ShieldCloseIcon,
  SidebarCloseIcon,
  X,
} from "lucide-react";

const NavbarModal = ({
  open,
  onClose,
  children,
  top,
  right,
  left,
  width,
  transform,
}) => {
  const style = {
    position: "absolute",
    top: top,
    right: right,
    left: left,
    transform: transform,
    width: width,
    bgcolor: "background.paper",
    border: "1px solid #ccc",
    borderRadius: 2,
    //   boxShadow: 24,
    p: 2,
    zIndex: 9999,
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.2)", // semi-white
          backdropFilter: "blur(10px)", // main blur
          WebkitBackdropFilter: "blur(10px)", // Safari support
        },
      }}

    >
      <Box sx={style} onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 1,
            color: "grey.500",
            zIndex: 10,
          }}
        >
          <X />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default NavbarModal;
