import React, { useState } from "react";
import Layout from "@/layouts/UserLayout";
import Image from "next/image";
import Meal from "@/public/meal.png";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import recipe from "./dataRecipe";
import CardRecipe from "@/components/mealPlan/CardRecipe";
import Modal from "@mui/material/Modal";
import Button from "@/components/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import useGetMealPlan from "@/hooks/user/useGetMealPlan";

export default function Mealplan() {
  const initMealPlan = {
    dietaryPreferences: "balanced",
    planType: "7",
    rangeCalories: "400-600",
  };

  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [mealPlan, setMealPlan] = useState(initMealPlan);
  const [page, setPage] = useState(1);

  console.log(mealPlan, "mealPlan");

  const {
    data: respGetMealPlan,
    mutate: mutateGetMealPlan,
    error,
  } = useGetMealPlan(mealPlan);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goNextPage = () => {
    if (page === 3) return;
    setPage((page) => page + 1);
  };

  const goPreviousPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  const submit = () => {
    mutateGetMealPlan();
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMealPlan({
      ...mealPlan,
      [name]: value,
    });
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
          <button
            type="button"
            onClick={handleOpenModal}
            className=" bg-mainpurple-100 rounded-md w-full px-2"
          >
            <span>Add Meal Plans</span>
          </button>
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="absolute modal-main">
          <div class="modal-box h-fit border-2">
            <div className="bg-mainpurple-100 absolute py-4 top-0 left-0 w-full">
              <h3 class="font-bold text-xl text-center  text-white">
                Customize Meal Plan
              </h3>
            </div>
            <div className="my-12">
              {page === 1 && (
                <PageOne mealPlan={mealPlan} onChange={onChange} />
              )}
              {page === 2 && (
                <PageTwo mealPlan={mealPlan} onChange={onChange} />
              )}
              {page === 3 && (
                <PageThree
                  mealPlan={mealPlan}
                  onChange={onChange}
                  setMealPlan={setMealPlan}
                />
              )}
            </div>
            <div className="flex justify-between">
              {page !== 1 && (
                <Button className="btn-orange" onClick={goPreviousPage}>
                  Go Back
                </Button>
              )}
              {page !== 3 && <Button onClick={goNextPage}>Go Next</Button>}
              {page === 3 && (
                <Button type="submit" onClick={submit}>
                  Submit
                </Button>
              )}
            </div>
            <div class="modal-action">
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* Switch Food */}
      <div className="flex justify-center min-h-full  bg-bluewhite rounded-lg">
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
              {respGetMealPlan?.data.lunch.map((item, index) => (
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

          {respGetMealPlan?.data.breakfast.map((item, index) => (
            <TabPanel value={value} index={index}>
              <div className="flex justify-center h-full pb-24">
                <div className="grid lg:grid-cols-3 space-y-5 lg:space-y-0 gap-10 items-stretch">
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

function PageOne({ mealPlan, onChange }) {
  const planTypeSelect = [
    {
      id: 1,
      name: "Wekly",
      value: "7",
    },
    {
      id: 2,
      name: "Daily",
      value: "1",
    },
  ];
  return (
    <div>
      <div>
        <h2>Choose a plan type</h2>
      </div>
      <div className="mt-2">
        <FormControl fullWidth>
          <Select name="planType" onChange={onChange} value={mealPlan.planType}>
            {planTypeSelect.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

function PageTwo({ mealPlan, onChange }) {
  const dietTypeSelect = [
    {
      id: 1,
      name: "Balanced",
      value: "balanced",
    },
    {
      id: 2,
      name: "High-Fiber",
      value: "high-fiber",
    },
    {
      id: 3,
      name: "High-Protein",
      value: "high-protein",
    },
    {
      id: 4,
      name: "Low-Carb",
      value: "low-carb",
    },
    {
      id: 5,
      name: "Low-Fat",
      value: "low-fat",
    },
    {
      id: 6,
      name: "Low-Sodium",
      value: "low-sodium",
    },
  ];
  return (
    <div>
      <div>
        <h2>Choose a diet type</h2>
      </div>
      <div className="mt-2">
        <FormControl fullWidth>
          <Select
            name="dietaryPreferences"
            onChange={onChange}
            value={mealPlan.dietaryPreferences}
          >
            {dietTypeSelect.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

function PageThree({ mealPlan, onChange, setMealPlan }) {
  const [rangeValue, setRangeValue] = useState([400, 600]);
  const [caloriesType, setCaloriesType] = useState(false);

  const caloriesTypeSelect = [
    {
      id: 1,
      name: "Recommended",
      value: false,
    },
    {
      id: 2,
      name: "Custom",
      value: true,
    },
  ];

  const handleChangeType = (event) => {
    setCaloriesType(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
    setMealPlan({
      ...mealPlan,
      rangeCalories: `${newValue[0]}-${newValue[1]}`,
    });
  };
  const valueText = (value) => {
    return `${value} Kcal`;
  };

  return (
    <div>
      <div>
        <h2>Choose a calorie range</h2>
      </div>
      <div className="mt-2">
        <div>
          <FormControl fullWidth>
            <Select
              name="caloriesTypeSelect"
              onChange={handleChangeType}
              value={caloriesType}
            >
              {caloriesTypeSelect.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="my-5">
          {caloriesType && (
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              onChange={handleChange}
              marks
              step={100}
              min={0}
              max={2000}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              disableSwap
            />
          )}
        </div>
      </div>
    </div>
  );
}
