import React, { useContext } from "react";
import { assets, stepsData } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Marquee } from "./Marquee";

const Header = () => {
  const lowerMarquee = [
    "/01.png",
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
  ];

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
    <>
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
          <p>Best text to image generator</p>
          <img src={assets.star_icon} alt="" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl max-w-4xl mx-auto mt-10 font-bold text-gray-900 leading-tight">
          Turn text to <span className="text-blue-600"> image </span>, in
          seconds.
        </h1>

        <p className="text-center max-w-xl mx-auto mt-5 text-neutral-600">
          Transform your imagination into stunning visuals with our cutting-edge
          AI technology. Create professional-quality images from simple text
          descriptions in just seconds.
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
          <Marquee images={lowerMarquee} from={0} to={"-100%"} />
        </div>
        <p className="mt-2 text-neutral-600">
          Generated Images from ChitrakaarAI
        </p>
      </motion.div>

      {/* How it Works Section */}
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-gray-50 py-20"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            How it works
          </h1>
          <p className="text-gray-600 mt-2">
            Transform words into stunning images
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {stepsData.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow flex items-start gap-4"
              >
                <img src={data.icon} alt="" className="w-6 h-6 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {data.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Create AI Image Section */}
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-b from-gray-50 to-white py-20"
      >
        <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} 
        className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Create AI Images
            </h1>
            <p className="text-gray-600 mt-2">
              Turn your imagination into visuals
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src="/06.png"
                alt="AI Generated Example"
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Introducing the AI-Powered Text to Image Generator
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Easily bring your ideas to life with our free AI image
                generator. Whether you need stunning visuals or unique imagery,
                our tool transforms your text into eye-catching images with just
                a few clicks. Imagine it, describe it, and watch it come to life
                instantly.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Simply type in a text prompt, and our cutting-edge AI will
                generate high-quality images in seconds. From product visuals to
                character designs and portraits, even concepts that don’t yet
                exist can be visualized effortlessly. Powered by advanced AI
                technology, the creative possibilities are limitless!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Header;
