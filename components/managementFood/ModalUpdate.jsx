import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "../Button";
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

  const [foodID, setFoodID] = useState();
  const [form, setForm] = useState(initValueForm);

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
        <div class="modal-box h-fit">
          <div className="bg-mainpurple-100 absolute py-4 top-0 left-0 w-full">
            <h3 class="font-bold text-xl text-center  text-white">Edit Food</h3>
          </div>
          <div className="mt-12 space-y-2">
            <div>
              <label>Name Food</label>
              <TextField
                fullWidth
                name="title"
                onChange={onChange}
                value={form.title}
                size="small"
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
                fullWidth
                name="calories"
                onChange={onChange}
                value={form.calories}
                size="small"
              />
            </div>
            <div>
              <label>Carbs</label>
              <TextField
                fullWidth
                name="carbs"
                onChange={onChange}
                value={form.carbs}
                size="small"
              />
            </div>
            <div>
              <label>Fat</label>
              <TextField
                fullWidth
                name="fat"
                onChange={onChange}
                value={form.fat}
                size="small"
              />
            </div>
            <div>
              <label>Protein</label>
              <TextField
                fullWidth
                name="protein"
                onChange={onChange}
                value={form.protein}
                size="small"
              />
            </div>
            <div>
              <label>Serving Size</label>
              <TextField
                fullWidth
                name="serving_size"
                onChange={onChange}
                value={form.serving_size}
                size="small"
              />
            </div>
          </div>
          <div class="modal-action">
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
