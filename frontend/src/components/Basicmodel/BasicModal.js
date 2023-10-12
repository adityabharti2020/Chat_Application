import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LuVideo } from "react-icons/lu";
import { Stack, TextField } from "@mui/material";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#BBBEF8",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({ userdata }) => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  // console.log(userdata.login.user.name);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const handleJoinRoom = useCallback(() => {
  navigate(`/dashboard/chatpannel/room/${value}`)

 },[navigate,value])
  return (
    <div>
      <Button onClick={handleOpen}>
        {<LuVideo className="ml-5 text-[45px] text-white" />}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Stack direction="row" spacing={5}>
            <TextField
              label="Enter Name"
              variant="standard"
              value={value}
              type="text"
              color="secondary"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button variant="contained" onClick={handleJoinRoom}>JOIN</Button>
          </Stack>
        </Stack>
        {/* <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
      </Modal>
    </div>
  );
};
export default BasicModal;
