import Head from "next/head";
import Image from "next/image";
import GuestLayout from "@/layouts/GuestLayout";
import Hero from "@/public/img/EatingPana.svg";
import { useDispatch } from "react-redux";
import { setPrivilege } from "store/appSlice";
import Button from "@/components/Button";
import Hamburger from "@/public/img/Hamburger.svg";
import About from "@/public/img/ChoicePana.svg";
import { LightningBoltIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(setPrivilege("guest"));

  return (
    <GuestLayout loc="home" container={false}>
      {/* Hero */}
      <section className="container mx-auto px-10 flex flex-col-reverse lg:flex-row max-h-fit py-20 lg:py-28 items-center ">
        <div className="flex-1 flex flex-col space-y-5">
          <h1 className="text-2xl space-y-1 md:space-y-3 mt-4 lg:text-5xl text-left lg:text-left font-semibold text-mainorange-100 leading-tight">
            <p> Track your Daily Calories</p>
            <p>to help your </p>
            <p className="text-black">Diet Program</p>
          </h1>
          <p className="lg:text-lg text-gray-600 text-left lg:text-left">
            A food diary application, calorie calculation, and food database
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className="bg-mainpurple-100 px-8 py-4 font-medium rounded-lg text-white hover:shadow-primary transition-shadow duration-300">
              START FOR FREE
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col w-full justify-center relative">
          <Image src={Hero} width={500} height={500} layout="intrinsic" />
          <div className="absolute right-0 lg:-right-0 top-0 lg:top-28 flex flex-col py-5 px-7 rounded-2xl shadow-xl bg-white/80 backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="font-bold">Meal Plans</div>
            <div className="text-gray-600 leading-relaxed">
              get custom mealplan 🥗
            </div>
          </div>
          <div className="absolute left-0 bottom-0 md:bottom-32 lg:bottom-16 flex bg-white/80 rounded-2xl shadow-xl backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <Image
              src={Hamburger}
              width={50}
              height={50}
              className="w-auto h-20 self-end"
            />
            <div className="pr-7 pl-2 py-5">
              <div className="font-bold">Count Calorie</div>
              <div className="text-gray-600 leading-relaxed">
                match the food 🍕
              </div>
            </div>
          </div>
          <div class="hidden md:flex justify-end space-x-1 font-bold">
            <span>Powered by</span>
            <LightningBoltIcon class="w-6 h-6 text-gray-900 fill-current" />
            <span>EDAMAM API</span>
          </div>
        </div>
      </section>
      <section className="mx-auto px-10 flex flex-col lg:flex-row items-center justify-around bg-white py-10">
        <div>
          <Image src={About} width={450} height={450} layout="intrinsic" />
        </div>
        <div className=" max-w-md space-y-5">
          <h1 className="text-2xl text-center md:text-left font-semibold">
            A Powerful Tool to Track Your Calories
          </h1>
          <p className="text-gray-600">
            with this application you can adjust the calorie intake needed with
            900K food database that is already available and you can custom meal
            plan according to your needs.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-10 flex justify-center items-center flex-col py-16 space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">FAQ</h1>
          <p className="text-gray-700">more information can be read here</p>
        </div>
        <div className=" max-w-screen-sm">
          <Accordion>
            <AccordionSummary
              expandIcon={<ChevronDownIcon className="h-5 w-5" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h1>How to use</h1>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ChevronDownIcon className="h-5 w-5" />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h1>How to get mealplan</h1>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ChevronDownIcon className="h-5 w-5" />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <h1>See your stats</h1>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </GuestLayout>
  );
}
