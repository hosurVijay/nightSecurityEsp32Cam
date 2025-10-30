import { asyncHandler } from "../Utills/asyncHandler.js";
import uploadOnCloudinary from "../Utills/cloudinary.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../Utills/apiError.js";
import { ApiResponse } from "../Utills/apiResponse.js";
import { sendAlertMail } from "../Utills/sendAlertMail.js";

const uploadImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filePath = req.file?.path;

  if (!filePath) throw new ApiError(404, "No image file received");

  const user = await User.findById(id);

  if (!user) throw new ApiError(404, "No user was found!");

  const cloudinaryResponse = await uploadOnCloudinary(filePath);

  if (!cloudinaryResponse?.secure_url) {
    throw new ApiError(500, "Failed to upload the image");
  }

  user.images.push({
    url: cloudinaryResponse.secure_url,
    alertSent: false,
    capturedAt: new Date(),
  });

  await user.save();

  sendAlertMail(user.email, cloudinaryResponse.secure_url)
    .then(() => {
      console.log(`Alert mail sent to ${user.email}`);
    })
    .catch(() => {
      console.log(`Error sending the alert mail`, err);
    });

  res.status(200).json(
    new ApiResponse(200, "Image uploaded succesfully!", {
      imageUrl: cloudinaryResponse.secure_url,
      alertSent: true,
    })
  );
});

export { uploadImage };
