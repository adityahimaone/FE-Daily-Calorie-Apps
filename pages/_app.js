import { useEffect } from "react";
import "../styles/globals.css";
import AppProvider from "@/context/AppProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import * as serviceWorker from "../firebase/serviceWorker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const drawerWidth = 240;
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      analytics();
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#50429B",
      },
      secondary: {
        main: "#F96E41",
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#50429B",
            color: "#FFFFFF",
            boxSizing: "border-box",
            width: drawerWidth,
          },
        },
      },
    },
  });

  if (process.env.NODE_ENV !== "production") {
    Router.events.on("routeChangeError", (err, url) => {
      if (
        err.stack.startsWith(
          "TypeError: Cannot read property 'call' of undefined\n    at __webpack_require__"
        )
      ) {
        location.href = url;
      }
    });
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate Loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
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
