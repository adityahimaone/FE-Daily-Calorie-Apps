import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import { TextField } from "@mui/material";
import useUpdateUser from "@/hooks/admin/useUpdateUser";

export default function ModalUpdate(props) {
  const { open, handleClose, rowData, mutateGetUser } = props;

  let idUser = rowData[0];

  const initValueForm = {
    name: rowData[1],
    email: rowData[2],
    password: "",
    avatar_url: rowData[7],
    gender: rowData[3],
    calorie: rowData[4],
    weight: rowData[6],
    height: rowData[5],
  };

  const [userID, setUserID] = useState();
  const [form, setForm] = useState(initValueForm);

  const { data, mutate, error } = useUpdateUser(userID, form);

  console.log(form, "form");

  useEffect(() => {
    idUser = rowData[0];
    setForm(initValueForm);
  }, [rowData]);

  console.log(rowData);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute modal-main">
        <div class="modal-box h-fit">
          <div className="bg-mainpurple-100 absolute py-4 top-0 left-0 w-full">
            <h3 class="font-bold text-xl text-center  text-white">Edit User</h3>
          </div>
          <div className="mt-14 space-y-4">
            <div>
              <TextField
                fullWidth
                label="Fullname"
                name="name"
                onChange={onChange}
                value={form.name}
                size="small"
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="email"
                label="Email"
                onChange={onChange}
                value={form.email}
                size="small"
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="password"
                label="Password"
                onChange={onChange}
                value={form.password}
                size="small"
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="avatar_url"
                label="Avatar"
                onChange={onChange}
                value={form.avatar_url}
                size="small"
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="gender"
                label="Gender"
                onChange={onChange}
                value={form.gender}
                size="small"
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="calorie"
                label="Calorie"
                onChange={onChange}
                value={form.calorie}
                size="small"
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="weight"
                label="Weight"
                onChange={onChange}
                value={form.weight}
                size="small"
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="height"
                label="Height"
                onChange={onChange}
                value={form.height}
                size="small"
              />
            </div>
          </div>
          <div class="modal-action">
            <Button
              onClick={() => {
                setUserID(idUser);
                mutate(null, false);
              }}
            >
              Submit
            </Button>
            <Button className="btn-cancel" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
