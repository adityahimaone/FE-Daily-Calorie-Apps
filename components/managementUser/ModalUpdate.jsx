import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@/components/Button";
import { TextField } from "@mui/material";
import useUpdateUser from "@/hooks/admin/useUpdateUser";
import appFirebase from "@/firebase/firebaseConfig.js";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ModalUpdate(props) {
  const { open, handleClose, rowData, mutateGetUser } = props;

  let idUser = rowData[0];

  const initValueForm = {
    name: rowData[1],
    email: rowData[2],
    password: rowData[3],
    avatar_url: rowData[8],
    gender: rowData[4],
    calorie: rowData[5],
    weight: rowData[7],
    height: rowData[6],
  };

  const [userID, setUserID] = useState();
  const [form, setForm] = useState(initValueForm);

  const { data, mutate, error } = useUpdateUser(userID, form);

  useEffect(() => {
    idUser = rowData[0];
    setForm(initValueForm);
  }, [rowData]);

  useEffect(() => {
    if (data?.meta?.code === 200) {
      handleClose();
      mutateGetUser();
    }
  }, [data?.meta?.code]);

  console.log(rowData);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const storageRef = appFirebase.storage().ref("avatar/");
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then((e) => {
      e.ref.getDownloadURL().then(function (downloadURL) {
        setForm({
          ...form,
          avatar_url: downloadURL,
        });
      });
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute modal-main">
        <div className="modal-box h-fit">
          <div className="bg-mainpurple-100 absolute py-4 top-0 left-0 w-full">
            <h3 className="font-bold text-xl text-center  text-white">
              Edit User
            </h3>
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
                // value={form.password}
                size="small"
              />
            </div>
            <div>
              <input
                type="file"
                name="avatar_url"
                onChange={onChangeImage}
                // value={form.avatar_url}
                accept="image/*"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mx-2">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  onChange={onChange}
                  name="gender"
                  value="male"
                  checked={form.gender === "male"}
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  onChange={onChange}
                  value="female"
                  name="gender"
                  checked={form.gender === "female"}
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
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
          <div className="modal-action">
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
