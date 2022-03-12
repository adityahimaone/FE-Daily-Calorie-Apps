import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import useDeleteFood from "@/hooks/admin/useDeleteFood";

export default function ModalDelete(props) {
  const { open, handleClose, rowData, mutateGetFood } = props;

  const [foodID, setFoodID] = useState();

  let idFood = rowData[0];
  let titleFood = rowData[1];

  const { data, mutate, error } = useDeleteFood(foodID);

  console.log(data, error);

  useEffect(() => {
    if (data?.meta?.code === 200) {
      handleClose();
      mutateGetFood(null, true);
    }
  }, [data?.meta?.code]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute modal-main">
        <div class="modal-box h-fit">
          <div className="bg-mainpurple-100 absolute py-4 top-0 left-0 w-full">
            <h3 class="font-bold text-xl text-center  text-white">
              Delete Food
            </h3>
          </div>
          <div className="mt-12">
            <p className="text-lg">{`Are you sure you want to delete ${
              titleFood ? titleFood : ""
            } ?`}</p>
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
