import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@/components/Button";
import { TextField } from "@mui/material";
import useUpdateFood from "@/hooks/admin/useUpdateFood";
import appFirebase from "@/firebase/firebaseConfig.js";

export default function ModalUpdate(props) {
  const { open, handleClose, rowData, mutateGetFood } = props;

  const idFood = rowData[0];

  const initValueForm = {
    title: rowData[1],
    img_url: rowData[2],
    calories: rowData[3],
    carbs: rowData[4],
    fat: rowData[5],
    protein: rowData[6],
    serving_size: rowData[7],
  };

  const initFormErr = {
    title: "",
    img_url: "",
    calories: "",
    carbs: "",
    fat: "",
    protein: "",
    serving_size: "",
  };

  const [foodID, setFoodID] = useState();
  const [form, setForm] = useState(initValueForm);
  const [formErr, setFormErr] = useState(initFormErr);

  const { data, mutate, error } = useUpdateFood(foodID, form);

  useEffect(() => {
    setForm(initValueForm);
  }, [rowData]);

  useEffect(() => {
    if (data?.meta?.code === 200) {
      handleClose();
      mutateGetFood(null, true);
    }
  }, [data?.meta?.code]);

  // rgex at least have 2 words and spaces
  const regexNumber = /^[0-9]{1,4}$/;
  const regexTitle = /^[a-zA-Z0-9-,]+(?:\s[a-zA-Z0-9-,]+)+$/;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      if (regexTitle.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({
          ...formErr,
          [name]: "Title must be alphanumeric",
        });
      }
    }

    if (name === "calories") {
      if (regexNumber.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({
          ...formErr,
          [name]:
            "Calories must be at least 1 characters & less than 5 characters",
        });
      }
    }

    if (name === "carbs") {
      if (regexNumber.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({
          ...formErr,
          [name]:
            "Carbs must be at least 1 characters & less than 5 characters",
        });
      }
    }

    if (name === "fat") {
      if (regexNumber.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({
          ...formErr,
          [name]: "Fat must be at least 1 characters & less than 5 characters",
        });
      }
    }

    if (name === "protein") {
      if (regexNumber.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({
          ...formErr,
          [name]:
            "Protein must be at least 1 characters & less than 5 characters",
        });
      }
    }

    if (name === "serving_size") {
      if (regexNumber.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({
          ...formErr,
          [name]:
            "Serving Size must be at least 1 characters & less than 5 characters",
        });
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const storageRef = appFirebase.storage().ref("food/");
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then((e) => {
      e.ref.getDownloadURL().then(function (downloadURL) {
        setForm({
          ...form,
          img_url: downloadURL,
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
              Edit Food
            </h3>
          </div>
          <div className="mt-12 space-y-2">
            <div>
              <label>Name Food</label>
              <TextField
                {...(formErr.title && { error: true })}
                fullWidth
                name="title"
                onChange={onChange}
                value={form.title}
                size="small"
                helperText={formErr.title !== "" ? formErr.title : null}
              />
            </div>
            <div>
              <label>Food IMG</label>
              <input
                type="file"
                name="img_url"
                onChange={onChangeImage}
                // value={form.avatar_url}
                accept="image/*"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label>Calories</label>
              <TextField
                {...(formErr.calories && { error: true })}
                fullWidth
                name="calories"
                onChange={onChange}
                value={form.calories}
                size="small"
                type="number"
                helperText={formErr.calories !== "" ? formErr.calories : null}
              />
            </div>
            <div>
              <label>Carbs</label>
              <TextField
                {...(formErr.carbs && { error: true })}
                fullWidth
                name="carbs"
                onChange={onChange}
                value={form.carbs}
                size="small"
                type="number"
                helperText={formErr.carbs !== "" ? formErr.carbs : null}
              />
            </div>
            <div>
              <label>Fat</label>
              <TextField
                {...(formErr.fat && { error: true })}
                fullWidth
                name="fat"
                onChange={onChange}
                value={form.fat}
                size="small"
                type="number"
                helperText={formErr.fat !== "" ? formErr.fat : null}
              />
            </div>
            <div>
              <label>Protein</label>
              <TextField
                {...(formErr.protein && { error: true })}
                fullWidth
                name="protein"
                onChange={onChange}
                value={form.protein}
                size="small"
                type="number"
                helperText={formErr.protein !== "" ? formErr.protein : null}
              />
            </div>
            <div>
              <label>Serving Size</label>
              <TextField
                {...(formErr.serving_size && { error: true })}
                fullWidth
                name="serving_size"
                onChange={onChange}
                value={form.serving_size}
                size="small"
                type="number"
                helperText={
                  formErr.serving_size !== "" ? formErr.serving_size : null
                }
              />
            </div>
          </div>
          <div className="modal-action">
            <Button
              onClick={() => {
                setFoodID(idFood);
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
