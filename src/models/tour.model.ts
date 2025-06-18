import mongoose, { InferSchemaType, Schema } from 'mongoose';

const TourSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    itinerary: {
      type: [
        {
          label: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      required: true,
    },
    tags: [{ type: String }],
    duration: { type: String },
    departureDate: { type: String },
    groupSize: { type: String },
    status: {
      type: String,
      default: 'DRAFT',
      enum: ['DRAFT', 'ACTIVE', 'UNDER_REVIEW'],
    },
    isFeatured: { type: Boolean, default: false },
    images: [{ type: String }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  },
);

export type TourType = InferSchemaType<typeof TourSchema>;

export const Tour = mongoose.model<TourType>('Tour', TourSchema);
