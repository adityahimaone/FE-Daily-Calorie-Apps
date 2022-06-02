import React, { useState } from "react";
import Adminlayout from "@/layouts/AdminLayout";
import useGetAllUser from "@/hooks/admin/useGetAllUser";
import MUIDataTable from "mui-datatables";
import profile from "@/public/dummy.png";
import CircularProgress from "@mui/material/CircularProgress";
import { PlusIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import ModalDelete from "@/components/managementUser/ModalDelete";
import ModalUpdate from "@/components/managementUser/ModalUpdate";
import ModalAdd from "@/components/managementUser/ModalAdd";

export default function ManagementUser() {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [rowData, setRowData] = useState([]);

  const handleOpenModalDelete = () => setModalDelete(true);
  const handleCloseModalDelete = () => setModalDelete(false);
  const handleOpenModalUpdate = () => setModalUpdate(true);
  const handleCloseModalUpdate = () => setModalUpdate(false);
  const handleOpenModalAdd = () => setModalAdd(true);
  const handleCloseModalAdd = () => setModalAdd(false);

  const { data, mutate: mutateGetUser, error, loading } = useGetAllUser();

  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "avatar",
      label: "Avatar",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-slate-200">
                <img src={value ? value : profile.src} />
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "password",
      label: "Password",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "calories",
      label: "Calories (Kcal)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "height",
      label: "Height (CM)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "weight",
      label: "Weight (KG)",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div className="flex gap-1">
                <button
                  className="btn-main  btn-blue"
                  onClick={() => {
                    setRowData(tableMeta.rowData);
                    handleOpenModalUpdate();
                  }}
                >
                  <div className="flex items-center">
                    <PencilAltIcon className="mr-1 w-4 h-4" />
                    Edit
                  </div>
                </button>
                <button
                  className="btn-main btn-red"
                  onClick={() => {
                    setRowData(tableMeta.rowData);
                    handleOpenModalDelete();
                  }}
                >
                  <div className="flex items-center">
                    <TrashIcon className="mr-1 w-4 h-4" />
                    Delete
                  </div>
                </button>
              </div>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
    download: true,
    print: true,
    viewColumns: true,
    actionsColumnIndex: -1,
    textLabels: {
      body: {
        noMatch: loading ? (
          <CircularProgress className="my-5" size={35} color={"success"} />
        ) : (
          "Sorry, there is no matching data to display"
        ),
      },
    },
    customToolbar: () => {
      return (
        <>
          <button className="btn-main btn-purple" onClick={handleOpenModalAdd}>
            <div className="flex items-center">
              <PlusIcon className="mr-1 w-4 h-4" />
              Add User
            </div>
          </button>
        </>
      );
    },
  };

  let newData = [];
  newData = data?.data?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      password: item.password,
      gender: item.gender,
      calories: item.calories,
      height: item.height,
      weight: item.weight,
      avatar: item.avatar_url,
    };
  });

  return (
    <Adminlayout pageTitle="Management User">
      <div>
        <div>
          <h1 className="text-3xl font-bold">Management User</h1>
        </div>
        <div className="mt-5">
          <MUIDataTable
            className="rounded-xl"
            title={"User List"}
            data={newData}
            columns={columns}
            options={options}
          />
        </div>
        <ModalDelete
          open={modalDelete}
          handleClose={handleCloseModalDelete}
          rowData={rowData}
          mutateGetUser={mutateGetUser}
        />
        <ModalUpdate
          open={modalUpdate}
          handleClose={handleCloseModalUpdate}
          rowData={rowData}
          mutateGetUser={mutateGetUser}
        />
        <ModalAdd
          open={modalAdd}
          handleClose={handleCloseModalAdd}
          mutateGetUser={mutateGetUser}
        />
      </div>
    </Adminlayout>
  );
}
