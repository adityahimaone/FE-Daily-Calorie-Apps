import React, { useState } from "react";
import useGetAllFood from "@/hooks/admin/useGetAllFood";
import Adminlayout from "@/layouts/AdminLayout";
import MUIDataTable from "mui-datatables";
import profile from "@/public/dummy.png";
import CircularProgress from "@mui/material/CircularProgress";
import { PlusIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import ModalDelete from "@/components/managementFood/ModalDelete";

export default function food() {
  const [modalDelete, setModalDelete] = useState(false);
  const [rowData, setRowData] = useState([]);

  const handleOpenModalDelete = () => setModalDelete(true);
  const handleCloseModalDelete = () => setModalDelete(false);

  const { data, mutate: mutateGetFood, error, loading } = useGetAllFood();

  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "title",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "img_url",
      label: "Image",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div class="avatar">
              <div class="w-8">
                <img src={value ? value : profile.src} />
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "calories",
      label: "Calories (Kcal)",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "protein",
      label: "Protein (g)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "carbs",
      label: "Carbs (g)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "fat",
      label: "Fat (g)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "serving_size",
      label: "Serving Size (g)",
      options: {
        filter: false,
        sort: false,
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
                <button className="btn-main btn-blue" onClick={() => {}}>
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
          <button className="btn-main btn-purple" onClick={() => {}}>
            <div className="flex items-center">
              <PlusIcon className="mr-1 w-4 h-4" />
              Add Food
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
      title: item.title,
      img_url: item.img_url,
      calories: item.calories.toFixed(0),
      protein: item.protein.toFixed(0),
      carbs: item.carbs.toFixed(0),
      fat: item.fat.toFixed(0),
      serving_size: item.serving_size.toFixed(0),
    };
  });

  return (
    <Adminlayout>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Management Food</h1>
        </div>
        <div className="mt-5">
          <MUIDataTable
            className="rounded-xl"
            title={"Food List"}
            data={newData}
            columns={columns}
            options={options}
          />
        </div>
        <ModalDelete
          open={modalDelete}
          handleClose={handleCloseModalDelete}
          rowData={rowData}
          mutateGetFood={mutateGetFood}
        />
      </div>
    </Adminlayout>
  );
}
