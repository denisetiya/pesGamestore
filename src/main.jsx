import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from '@react-oauth/google';

import {motion} from "framer-motion"
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7}}
        exit={{ opacity: 0, x: -100 }}
        className="fixed top-0 z-50 w-full">
          <Navbar />
        </motion.div>
        <div className="mt-20 mb-10 md:mt-28">
          <App />
        </div>
        <div className="w-full mt-28 sm:mt-48">          
          <div className="flex items-center justify-center w-full ">
            <div className="lg:w-[70%]">
              <Footer />
            </div>
          </div>
        </div>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
