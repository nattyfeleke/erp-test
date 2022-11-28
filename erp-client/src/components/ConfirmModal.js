import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const { confirmDialog, handleClose } = props;
  return (
    <div>
      <Modal
        open={confirmDialog.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {confirmDialog.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {confirmDialog.subtitle}
          </Typography>
          <Stack direction="row" spacing={2} color="#484848" sx={{ mt: 2 }}>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={confirmDialog.onConfirm}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
