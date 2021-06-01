import cloudinary from "../../../config/cloudinaryConfig";
import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { ErrorHandler } from "../../../middlewares/ErrorHandler";
import Room from "../../../models/Room";

const handler = nc({ onError: ErrorHandler });
dbConnect();

const getAllRooms = async (req, res, next) => {
  try {
    const {
      location = null,
      pageNumber = 1,
      pricePerMonth = null,
      ...filter
    } = req.query;
    const queryString = location
      ? {
          ...filter,
          location: {
            $regex: location,
            $options: "i",
          },
        }
      : filter;

    const total = await Room.countDocuments(queryString);
    const pageSize = 4;
    const skip = (pageNumber - 1) * pageSize;
    const sort = pricePerMonth
      ? { pricePerMonth: Number(pricePerMonth) }
      : { createdAt: -1 };
    const isNext = pageSize * pageNumber < total ? true : false;
    const isPrevious = pageNumber > 1 ? true : false;

    const rooms = await Room.find(queryString)
      .skip(skip)
      .limit(pageSize)
      .sort(sort);
    res.status(200).json({
      success: true,
      result: rooms.length,
      isNext,
      isPrevious,
      rooms,
    });
  } catch (error) {
    console.log(error);
  }
};

const createOneRoom = async (req, res, next) => {
  try {
    const {images} = req.body;
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

    const room = await Room.create(req.body);
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    next(error);
  }
};

handler.get(getAllRooms);
handler.post(createOneRoom);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
export default handler;
