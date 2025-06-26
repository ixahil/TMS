import { InferSchemaType, model, Schema } from 'mongoose';

const BookingSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    numberOfTravelers: {
      type: Number,
      required: true,
    },
    emergencyPhone: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    travelDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['CONFIRMED', 'PENDING', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING',
    },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'PENDING', 'FAILED'],
      default: 'PENDING',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
  },
  { timestamps: true },
);

export type BookingType = InferSchemaType<typeof BookingSchema>;

export const Booking = model<BookingType>('Booking', BookingSchema);
