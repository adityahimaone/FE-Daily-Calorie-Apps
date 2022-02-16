import React, { useState } from "react";
import Layout from "@/layouts/UserLayout";
import Image from "next/image";
import Meal from "@/public/meal.png";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import recipe from "./dataRecipe";
import CardRecipe from "@/components/mealPlan/CardRecipe";

export default function Mealplan() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      {/* card */}
      <div className="flex flex-col lg:flex-row bg-mainorange-100 rounded-lg text-white my-4 p-2 w-full">
        <div className="flex flex-auto items-center ">
          <div className="flex">
            <Image src={Meal} />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">Customize Meal Plan</h2>
            <p>Try to arrange a meal plan according to your needs</p>
          </div>
        </div>
        <div className="flex mt-2 lg:mt-0">
          <button className=" bg-mainpurple-100 rounded-md w-full py-1 px-2">
            <span>Add Meal Plans</span>
          </button>
        </div>
      </div>
      {/* Switch Food */}
      <div className="flex justify-center bg-bluewhite rounded-lg">
        <div className="w-full">
          <div className="flex border-b-2 justify-center">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable basic tabs example"
            >
              {recipe.data.lunch.map((item, index) => (
                <Tab
                  key={index}
                  label={`Day ${index + 1}`}
                  value={index}
                  aria-controls={`scrollable-auto-tabpanel-${index}`}
                  id={`scrollable-auto-tab-${index}`}
                />
              ))}
            </Tabs>
          </div>

          {recipe.data.breakfast.map((item, index) => (
            <TabPanel value={value} index={index}>
              <div className="flex justify-center">
                <div className="grid lg:grid-cols-3 gap-10">
                  <CardRecipe element={item} mealType="Breakfast" />
                  <CardRecipe
                    element={recipe.data.lunch[index]}
                    mealType="Lunch"
                  />
                  <CardRecipe
                    element={recipe.data.dinner[index]}
                    mealType="Dinner"
                  />
                </div>
              </div>
            </TabPanel>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="p-3">
          <p>{children}</p>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
