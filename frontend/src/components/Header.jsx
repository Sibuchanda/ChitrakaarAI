import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Marquee } from "./Marquee";

const Header = () => {

  const lowerMarquee = ["/01.png",
    "/02.png",
    "/03.png",
    "/04.png",
    "/05.png",
    "/06.png",
    "/07.png",
    "/02.png",
    "/03.png",
    "/04.png",
    "/05.png",
    "/06.png",
    "/07.png",
    "/06.png",
    "/02.png",
    "/03.png",

  ]



  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-natural-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Best text to image generaor</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <h1 className="text-4xl md:text-6xl lg:text-8xl max-w-4xl mx-auto mt-10 font-bold text-gray-900 leading-tight">
        Turn text to <span className="text-blue-600"> image </span>, in seconds.
      </h1>

      <p className="text-center max-w-xl mx-auto mt-5">
        Transform your imagination into stunning visuals with our cutting-edge AI technology. 
          Create professional-quality images from simple text descriptions in just seconds.
      </p>
      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        Generate Images
        <img src={assets.star_group} alt="" className="h-6" />
      </motion.button>

      <div className="flex flex-wrap justify-center mt-16 gap-3">
        <Marquee images={lowerMarquee} from={0} to={"-100%"}/>
      </div>
      <p className="mt-2 text-neutral-600">Generated Images form CitrakaarAI</p>
    </motion.div>
  );
};

export default Header;