import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import useDeleteUser from "@/hooks/admin/useDeleteUser";

export default function ModalDelete(props) {
  const { open, handleClose, rowData, mutateGetUser } = props;

  const [userID, setUserID] = useState();

  let idUser = rowData[0];
  let nameUser = rowData[1];

  const { data, mutate, error } = useDeleteUser(userID);

  useEffect(() => {
    if (data?.meta?.code === 200) {
      handleClose();
      mutateGetUser(null, true);
    }
  }, [data?.meta?.code]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute modal-main">
        <div class="modal-box h-fit">
          <div className="bg-mainpurple-100 absolute py-4 top-0 left-0 w-full">
            <h3 class="font-bold text-xl text-center  text-white">
              Delete User
            </h3>
          </div>
          <div className="mt-12">
            <p className="text-lg">{`Are you sure you want to delete ${
              nameUser ? nameUser : ""
            } ?`}</p>
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
