import userModel from "../models/user.js";
import FormData from "form-data";
import axios from 'axios'


const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }
    if (user.creditBalance === 0 || userModel.creditBalance <= 0) {
      return res
        .status(403)
        .json({
          success: false,
          message: "No Credit Balance",
          creditBalance: user.creditBalance,
        });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        "x-api-key": process.env.CLIPDROP_API,
      },
      responseType: 'arraybuffer'
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`

    await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1});

    return res.status(200).json({success: true, message: "Image generated", creditBalance: user.creditBalance - 1, resultImage });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export default generateImage;
