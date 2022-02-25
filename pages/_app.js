import { useEffect } from "react";
import "../styles/globals.css";
import AppProvider from "@/context/AppProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import * as serviceWorker from "../firebase/serviceWorker";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      analytics();
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate Loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
export default MyApp;
