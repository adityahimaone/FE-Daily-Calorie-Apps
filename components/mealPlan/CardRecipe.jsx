import React from "react";

export default function CardRecipe(props) {
  const { element, mealType } = props;
  return (
    <div>
      <h1 className="text-center my-4 font-bold text-xl">{mealType}</h1>
      <a href={element.recipeURL}>
        <div className="max-w-xs bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:scale-105">
          <div className="">
            <div className="">
              <img
                className="h-48 w-full object-cover"
                src={element.recipeImageURL}
              />
            </div>
            <div className="p-5">
              <h2 className="text-mainpurple-100 font-semibold text-lg">
                {element.recipeLabel}
              </h2>
              <p className="text-xl font-medium">
                +{element.recipeCalories.toFixed(0)} Kcal
              </p>
              <hr className="my-2" />
              <h3 className=" font-semibold">Ingredients : </h3>
              <ul>
                {element.recipeIngredients.map((item, index) => (
                  <li key={index}>
                    <p className="font-light"> - {item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
