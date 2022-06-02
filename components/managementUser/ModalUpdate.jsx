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
    email: rowData[3],
    password: rowData[4],
    avatar_url: rowData[2],
    gender: rowData[5],
    calorie: rowData[6],
    weight: rowData[8],
    height: rowData[7],
  };

  const initFormErr = {
    name: "",
    email: "",
    password: "",
    avatar_url: "",
    gender: "",
    calorie: "",
    weight: "",
    height: "",
  };

  const [userID, setUserID] = useState();
  const [form, setForm] = useState(initValueForm);
  const [formErr, setFormErr] = useState(initFormErr);

  const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword = /^[A-Za-z0-9]*$/;
  const regexCalorie = /^[0-9]{1,}$/;
  const regexWeight = /^[0-9]{1,3}$/;
  const regexHeight = /^[0-9]{1,3}$/;

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

    if (name === "name") {
      if (regexName.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({ ...formErr, [name]: "Name is not valid" });
      }
    }

    if (name === "email") {
      if (regexEmail.test(value)) {
        setFormErr({ ...formErr, email: "" });
      } else {
        setFormErr({ ...formErr, email: "Invalid email" });
      }
    }

    if (name === "password") {
      if (regexPassword.test(value)) {
        setFormErr({ ...formErr, password: "" });
      } else {
        setFormErr({ ...formErr, password: "Invalid password" });
      }
    }

    if (name === "calorie") {
      if (regexCalorie.test(value)) {
        setFormErr({ ...formErr, calorie: "" });
      } else {
        setFormErr({ ...formErr, calorie: "Invalid calorie" });
      }
    }

    if (name === "weight") {
      if (regexWeight.test(value)) {
        setFormErr({ ...formErr, weight: "" });
      } else {
        setFormErr({ ...formErr, weight: "Invalid weight" });
      }
    }

    if (name === "height") {
      if (regexHeight.test(value)) {
        setFormErr({ ...formErr, height: "" });
      } else {
        setFormErr({ ...formErr, height: "Invalid height" });
      }
    }

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
                {...(formErr.name && { error: true })}
                fullWidth
                label="Fullname"
                name="name"
                onChange={onChange}
                value={form.name}
                size="small"
                helperText={formErr.name !== "" ? formErr.name : null}
              />
            </div>
            <div>
              <TextField
                {...(formErr.email && { error: true })}
                fullWidth
                name="email"
                label="Email"
                onChange={onChange}
                value={form.email}
                size="small"
                helperText={formErr.email !== "" ? formErr.email : null}
              />
            </div>
            <div>
              <TextField
                {...(formErr.password && { error: true })}
                fullWidth
                name="password"
                label="Password"
                onChange={onChange}
                type="password"
                // value={form.password}
                size="small"
                helperText={formErr.password !== "" ? formErr.password : null}
              />
            </div>
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-mainorange-100 ring-offset-base-100 ring-offset-2">
                <img src={form.avatar_url} className="avatar" alt="avatar" />
              </div>
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
                {...(formErr.calorie && { error: true })}
                fullWidth
                name="calorie"
                label="Calorie"
                onChange={onChange}
                value={form.calorie}
                type="number"
                size="small"
                helperText={formErr.calorie !== "" ? formErr.calorie : null}
              />
            </div>
            <div>
              <TextField
                {...(formErr.weight && { error: true })}
                fullWidth
                name="weight"
                label="Weight"
                onChange={onChange}
                value={form.weight}
                type="number"
                size="small"
                helperText={formErr.weight !== "" ? formErr.weight : null}
              />
            </div>
            <div>
              <TextField
                {...(formErr.height && { error: true })}
                fullWidth
                name="height"
                label="Height"
                onChange={onChange}
                value={form.height}
                type="number"
                size="small"
                helperText={formErr.height !== "" ? formErr.height : null}
              />
            </div>
          </div>
          <div className="modal-action">
            <Button
              onClick={() => {
                if (
                  idUser &&
                  formErr.name === "" &&
                  formErr.email === "" &&
                  formErr.password === "" &&
                  formErr.calorie === "" &&
                  formErr.weight === "" &&
                  formErr.height === "" &&
                  form.name !== "" &&
                  form.email !== "" &&
                  form.password !== "" &&
                  form.calorie !== "" &&
                  form.weight !== "" &&
                  form.height !== ""
                ) {
                  setUserID(idUser);
                  mutate(null, false);
                }
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
