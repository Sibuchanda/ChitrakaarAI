import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import getRandomPrompts from "../components/GetRandomPrompts";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(input);
    setInput(randomPrompt);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-2xl flex flex-col items-center gap-8"
      >
        {/* Heading */}
        <div className="text-center">
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Turn your imagination into visuals with just a description
          </p>
        </div>

        {/* Image & Loading */}
        <div className="relative w-full flex justify-center">
          <img
            src={image}
            alt="Generated result"
            className="max-w-sm rounded-xl shadow-md"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>
        {loading && (
          <p className="text-blue-500 text-sm font-medium">Loading...</p>
        )}
        {!isImageLoaded && (
          <div className="w-full max-w-xl flex flex-col gap-3">
            {/* Label + Button Row */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Prompt
              </label>
              <button
              onClick={handleSurpriseMe}
                type="button"
                className="font-semibold text-xs bg-[#777cfd] py-1 px-2 rounded-[5px] text-white hover:cursor-pointer hover:bg-[#6468f2] "
              >
                Get Prompts
              </button>
            </div>

            {/* Input Field */}
            <div className="flex bg-neutral-200 text-sm p-1 rounded-full shadow-md">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Describe what you want to generate..."
                className="flex-1 bg-transparent outline-none px-4 text-gray-800 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 transition-all px-6 sm:px-10 py-2 sm:py-3 text-white font-semibold rounded-full"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isImageLoaded && (
          <div className="flex gap-4 flex-wrap justify-center mt-6">
            <button
              onClick={() => setIsImageLoaded(false)}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all px-6 py-2 rounded-full text-sm font-semibold"
            >
              Generate Another
            </button>
            <a
              href={image}
              download
              className="bg-blue-500 hover:bg-blue-600 transition-all px-6 py-2 rounded-full text-sm font-semibold text-white"
            >
              Download
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default Result;
