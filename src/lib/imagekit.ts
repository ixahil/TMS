import { UploadedFile } from 'express-fileupload';
import ImageKit from 'imagekit';
import config from '../config/config';

const imagekit = new ImageKit({
  publicKey: config.publicKey,
  privateKey: config.privateKey,
  urlEndpoint: config.urlEndpoint,
});

type image = {
  asset_id: string;
  resource_type: string;
  folder: string;
  url: string;
  thumbnail: string;
  filename: string;
};

export const uploadImages = async (
  images: UploadedFile | UploadedFile[],
  folder: string = 'tours',
) => {
  const uploadedImages: string[] = [];

  const uploadedImagesObj: image[] = [];

  const files = Array.isArray(images) ? images : [images];

  try {
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const result = await imagekit.upload({
          file: file.data, // buffer
          fileName: file.name,
          folder: folder, // e.g. "tours",
          extensions: [
            {
              name: 'google-auto-tagging',
              maxTags: 5,
              minConfidence: 95,
            },
          ],
          transformation: {
            post: [
              {
                type: 'transformation',
                value: 'w-100',
              },
            ],
          },
        });
        uploadedImages.push(result.url);
        uploadedImagesObj.push({
          asset_id: result.fileId,
          resource_type: result.fileType,
          folder: result.filePath,
          url: result.url,
          thumbnail: result.thumbnailUrl,
          filename: file.name,
        });
      }),
    );

    return { images: uploadImages, imagesObj: uploadedImagesObj };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
