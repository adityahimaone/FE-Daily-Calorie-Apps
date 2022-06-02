import React from "react";

function CardHistories({
  title,
  id,
  image,
  serving_size,
  calories,
  onDelete,
  onGoHistoryPage,
}) {
  return (
    <div className="flex flex-col items-center w-full pb-4 mb-2 bg-white rounded-lg shadow-md lg:flex-row lg:p-4">
      <div className="w-full lg:w-1/6 lg:h-1/5">
        <img
          className="object-cover w-full h-48 rounded-t-lg lg:rounded-lg"
          src={
            image
              ? image
              : "https://assets.materialup.com/uploads/98622f57-ac59-4b44-8db2-3355bb43efed/preview.jpg"
          }
          alt={title}
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full px-4 lg:flex-row">
        <div className="flex justify-between w-full p-4">
          <div>
            <p className="text-xl">{title}</p>
            <p>{serving_size} G</p>
          </div>
          <div>
            <p className="text-xl">
              +{calories !== 0 ? calories.toFixed(0) : 0}
              Kcal
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/6 space-y-2">
          <button
            onClick={() => {
              onGoHistoryPage(id);
            }}
            className="w-full px-4 py-2 text-white rounded-lg bg-mainpurple-100 hover:bg-orange-700/80"
          >
            Detail
          </button>
          <button
            onClick={() => {
              onDelete(id);
            }}
            className="w-full px-4 py-2 text-white rounded-lg bg-mainorange-100 hover:bg-orange-700/80"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardHistories;
