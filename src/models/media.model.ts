import { InferSchemaType, model, Schema } from 'mongoose';

const MediaSchema = new Schema(
  {
    asset_id: {
      type: String,
      required: true,
    },
    resource_type: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export type MediaType = InferSchemaType<typeof MediaSchema>;

export const Media = model<MediaType>('Media', MediaSchema);
