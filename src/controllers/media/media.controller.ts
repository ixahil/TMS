import { UploadedFile } from 'express-fileupload';
import { asyncHandler } from '../../middlewares/async.handler';
import { Request, Response } from 'express';
import { uploadImages } from '../../lib/imagekit';
import { Media, MediaType } from '../../models/media.model';
import AppResponse from '../../utils/global/app.response';

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files?.images;

  const uploadedImages: MediaType[] = [];

  if (files) {
    const { images, imagesObj } = await uploadImages(
      files as UploadedFile | UploadedFile[],
      `media/${req.user.id}`,
    );

    for (const image of imagesObj) {
      const uploaded = await Media.create({
        asset_id: image.asset_id,
        filename: image.filename,
        folder: image.folder,
        resource_type: image.resource_type,
        url: image.url,
        thumbnail: image.thumbnail,
        user: req.user.id,
      });
      uploadedImages.push(uploaded);
    }
  }

  res
    .status(200)
    .json(
      new AppResponse(
        200,
        { images: uploadedImages },
        'uploaded successfully!',
      ),
    );
});

export const getAllMedia = asyncHandler(async (req: Request, res: Response) => {
  const images = await Media.find({ user: req.user.id });

  res
    .status(200)
    .json(new AppResponse(200, { images: images }, 'uploaded successfully!'));
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const image = await Media.findByIdAndDelete({
    user: req.user.id,
    id: req.params.id,
  });

  res
    .status(200)
    .json(new AppResponse(200, { image: image }, 'uploaded successfully!'));
});

export const deleteMediaBulk = asyncHandler(
  async (req: Request, res: Response) => {
    const images = req.body.images;

    if (!images) {
      res.status(200).json({ message: 'No images to delete' });
    }

    for (const image of images) {
      await Media.findOneAndDelete({
        _id: image,
        user: req.user.id,
      });
    }

    res.status(200).json(new AppResponse(200, null, 'uploaded successfully!'));
  },
);

export const media = {
  uploadMedia,
  getAllMedia,
  deleteMedia,
  deleteMediaBulk,
};
