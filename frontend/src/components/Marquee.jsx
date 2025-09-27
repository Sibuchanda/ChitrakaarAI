import React from "react";
import { motion } from "motion/react";

export const Marquee = ({ images, from, to }) => {
  return (
    <div className="relative overflow-hidden px-6 md:px-12 my-6">
      {/* Gradient edges */}
      <div className="pointer-events-none absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

      {/* Upper Marquee */}
      <div className="flex">
        <motion.div
          initial={{ x: from }}
          animate={{ x: to }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 items-center"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`marquee-${index}`}
              className="h-20 w-auto object-contain mx-3"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: from }}
          animate={{ x: to }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 items-center"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`marquee-${index}`}
              className="h-20 w-auto object-contain mx-3"
            />
          ))}
        </motion.div>
      </div>

      {/* Lower Marquee */}
      <div className="flex space-x-6 mt-8">
        <motion.div
          initial={{ x: to }}
          animate={{ x: from }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 items-center"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`marquee-rev-${index}`}
              className="h-20 w-auto object-contain mx-3"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: to }}
          animate={{ x: from }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 items-center"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`marquee-rev-${index}`}
              className="h-20 w-auto object-contain mx-3"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
