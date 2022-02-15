import React, { useState } from "react";
import Layout from "@/layouts/UserLayout";
import Image from "next/image";
import Meal from "@/public/meal.png";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import recipe from "./dataRecipe";

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
              <Tab label="Day 1" {...a11yProps(0)} />
              <Tab label="Day 2" {...a11yProps(1)} />
              <Tab label="Day 3" {...a11yProps(2)} />
              <Tab label="Day 4" {...a11yProps(3)} />
              <Tab label="Day 5" {...a11yProps(4)} />
              <Tab label="Day 6" {...a11yProps(5)} />
              <Tab label="Day 7" {...a11yProps(6)} />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            Item 1
            <div className="max-w-xs bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="">
                <div className="">
                  <img
                    className="h-48 w-full object-cover"
                    src={recipe.data.lunch[0].recipeImageURL}
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-mainpurple-100 font-semibold text-lg">
                    {recipe.data.lunch[0].recipeLabel}
                  </h2>
                  <p className="text-xl font-medium">
                    +{recipe.data.lunch[0].recipeCalories.toFixed(0)} Kcal
                  </p>
                  <hr className="my-2" />
                  <h3 className=" font-semibold">Ingredients : </h3>
                  <ul>
                    {recipe.data.lunch[0].recipeIngredients.map(
                      (item, index) => (
                        <li key={index}>
                          <p className="font-light"> - {item}</p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item 2
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item 3
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item 4
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item 5
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item 6
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item 7
          </TabPanel>
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
