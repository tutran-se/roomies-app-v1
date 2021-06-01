import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import Room from "../../../models/Room";
import { ErrorHandler } from "../../../middlewares/ErrorHandler";
import cloudinary from "../../../config/cloudinaryConfig";

const handler = nc({ onError: ErrorHandler });
dbConnect();

const getOneRoom = async (req, res, next) => {
  try {
    const { id } = req.query;
    const room = await Room.findById(id);
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneRoom = async (req, res, next) => {
  try {
    const { images } = req.body;
    if (!images[0].url) {
      const imagesLinks = [];
      // Upload image to cloudinary
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "roomies-app/",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      req.body.images = imagesLinks;
    }

    const { id } = req.query;
    const room = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneRoom = async (req, res, next) => {
  try {
    const { id } = req.query;
    await Room.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

handler.get(getOneRoom);
handler.put(updateOneRoom);
handler.delete(deleteOneRoom);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
export default handler;
