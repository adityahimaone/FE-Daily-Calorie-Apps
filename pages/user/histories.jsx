import React, { useEffect } from "react";
import Layout from "@/layouts/UserLayout";
import MUIDataTable from "mui-datatables";
import useGetAllHistories from "@/hooks/user/useGetAllHistories";
import Button from "@/components/Button";

export default function histories() {
  const { data, error } = useGetAllHistories();

  const columns = [
    {
      name: "no",
      label: "No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "total_calories",
      label: "Total Calories",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "total_food",
      label: "Total Food",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "water",
      label: "water",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "detail",
      label: "Detail",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              className="btn-orange"
              onClick={() => {
                console.log(value);
              }}
            >
              Detail
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
    download: false,
    print: false,
    viewColumns: false,
    actionsColumnIndex: -1,
  };

  let newData = [];

  if (data) {
    newData = data?.data?.map((item, index) => {
      return {
        no: index + 1,
        date: item.date,
        total_calories: item.total_calories + " Kcal",
        total_food: item.total_food,
        water: item.water,
        detail: item.id,
      };
    });
  }

  console.log(data?.data, "newData");
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-2xl">Histories</h1>
        </div>
        <div className="mt-4">
          <div className=" space-y-4">
            {data?.data?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="w-full bg-bluewhite rounded-lg shadow-lg flex items-center justify-between py-3 px-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 mr-4 rounded shadow-2xl bg-slate-200/70">
                    <p>AD</p>
                  </div>
                  <div>
                    <p>{item.date}</p>
                  </div>
                  <div>
                    <p>{item.total_calories}</p>
                  </div>
                  <div>
                    <p>{item.water} L</p>
                  </div>
                  <div>
                    <p>{item.total_food} Food Total</p>
                  </div>
                  <div>
                    <Button
                      className="btn-orange px-4"
                      onClick={() => {
                        console.log(value);
                      }}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <MUIDataTable
            className="rounded-lg"
            title={"Histories"}
            data={newData}
            columns={columns}
            options={options}
          /> */}
        </div>
      </div>
    </Layout>
  );
}
