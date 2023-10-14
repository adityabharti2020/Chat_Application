import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField, Container } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../api/axios";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 700,
//   height: 350,
//   bgcolor: "#BBBEF8",
//   border: "2px solid #000",
//   borderRadius: "15px",
//   boxShadow: 24,
//   p: 4,
// };

export const SettingModal = ({ setdisplayfun }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setdisplayfun(open);
    console.log(open);
  };
  // console.log(open)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // console.log(open)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${baseURL}/updateMe`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        image: formData.image,
      });
      console.log(response);
      alert(response.data.message);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    // You can handle the form submission here, for example, send the data to a server.
    console.log(formData);
  };
  return (
    <Box>
      <Box onClick={handleOpen}>
        <Typography className=" hover:bg-slate-400 hover:rounded "
        sx={{
          backgroundColor:"slate",
          marginY:'8px',
          paddingX:"8px",
          fontSize:"21px",
          cursor:"pointer"
        }}
        >
          Profile
        </Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 350,
            bgcolor: "#BBBEF8",
            border: "2px solid #000",
            borderRadius: "15px",
            boxShadow: 24,
            p: 4,
          }}
          //  sx={style}
        >
          <Typography
            variant="h5"
            // className="flex justify-center items-center bg-slate-400 rounded py-2"
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "10px",
              paddingY: "8px",
              backgroundColor: "ffffff",
              fontSize:"20px",
              fontWeight:"bold"
            }}
          >
            Update Your Profile
          </Typography>
          <Container sx={{marginTop:"30px"}}>
            <form onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  autoComplete="off"
                />
                {/* <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                /> */}
                {/* <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                /> */}
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  // autoComplete="off"
                />
              </Stack>
              <Stack direction="row" spacing={2} className="mt-10">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="file"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  margin="normal"
                />
              </Stack>
              <Stack className="flex justify-center items-center mt-6">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Stack>
            </form>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
};
export default SettingModal;
