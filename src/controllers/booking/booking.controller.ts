import { Request, Response } from 'express';
import { asyncHandler } from '../../middlewares/async.handler';
import { Booking } from '../../models/booking.model';
import AppResponse from '../../utils/global/app.response';
import { AppError } from '../../utils/global/app.error';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    numberOfTravelers,
    emergencyPhone,
    tourId,
    travelDate,
    totalAmount,
  } = req.body;

  if (!tourId) {
    res.status(400).json(new AppError(400, 'Invalid Tour Id'));
  }

  const booking = await Booking.create({
    firstName,
    lastName,
    email,
    phone,
    numberOfTravelers,
    emergencyPhone,
    user: req.user.id,
    tour: tourId,
    travelDate,
    totalAmount,
  });

  res
    .status(201)
    .json(new AppResponse(201, { booking }, 'Booking created successfully'));
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json(new AppError(400, 'Invalid Booking Id'));
  }

  const booking = await Booking.findById(id);
  res.status(200).json(new AppResponse(200, { booking }));
});

export const getUserBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const bookings = await Booking.find({ user: req.user.id }).populate([
      'tour',
      'user',
    ]);
    res.status(200).json(new AppResponse(200, { bookings }));
  },
);

export const getUserBookingById = asyncHandler(
  async (req: Request, res: Response) => {
    const bookings = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    res.status(200).json(new AppResponse(200, { bookings }));
  },
);

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const bookings = await Booking.find();
  res.status(200).json(new AppResponse(200, { bookings }));
});

export const booking = {
  create,
  get,
  getAll,
  getUserBookingById,
  getUserBookings,
};
