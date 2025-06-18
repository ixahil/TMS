import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { uploadImages } from '../../lib/imagekit';
import { asyncHandler } from '../../middlewares/async.handler';
import { Tour } from '../../models/tour.model';
import {
  buildTourQuery,
  getPaginatedTours,
} from '../../services/tour.services';
import { AppError } from '../../utils/global/app.error';
import AppResponse from '../../utils/global/app.response';

const getAllToursByAgent = asyncHandler(async (req: Request, res: Response) => {
  const filters = buildTourQuery({
    search: req.query.search as string,
    country: (req.query.country as string)?.split(',') || [],
    state: (req.query.state as string)?.split(',') || [],
    conditions: { user: req.user.id },
  });

  const data = await getPaginatedTours({
    query: filters,
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
    sortOrder: (req.query.order as 'asc' | 'desc') || 'desc',
  });

  res.status(200).json(new AppResponse(200, data));
});

const getAllTours = asyncHandler(async (req: Request, res: Response) => {
  const filters = buildTourQuery({
    search: req.query.search as string,
    country: (req.query.country as string)?.split(',') || [],
    state: (req.query.state as string)?.split(',') || [],
  });

  const data = await getPaginatedTours({
    query: filters,
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
    sortOrder: (req.query.order as 'asc' | 'desc') || 'desc',
  });

  res.status(200).json(new AppResponse(200, data));
});

const getAllFeaturedTours = asyncHandler(
  async (req: Request, res: Response) => {
    const filters = buildTourQuery({
      search: req.query.search as string,
      country: (req.query.country as string)?.split(',') || [],
      state: (req.query.state as string)?.split(',') || [],
      status: 'ACTIVE',
      conditions: { isFeatured: true },
    });

    const data = await getPaginatedTours({
      query: filters,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortOrder: (req.query.order as 'asc' | 'desc') || 'desc',
    });

    res.status(200).json(new AppResponse(200, data, 'Success'));
  },
);

const getTourById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = await Tour.findOne({
    _id: id,
  }).populate('user');

  res.status(200).json(new AppResponse(200, { tour }, 'Success'));
});

export const getCitiesNStates = asyncHandler(
  async (req: Request, res: Response) => {
    const [countries, states] = await Promise.all([
      Tour.distinct('country'),
      Tour.distinct('state'),
    ]);

    res
      .status(200)
      .json(
        new AppResponse(
          200,
          { countries, states },
          'Fetched countries and states',
        ),
      );
  },
);

export const getAllInternationTours = asyncHandler(
  async (req: Request, res: Response) => {
    const filters = buildTourQuery({
      search: req.query.search as string,
      country: (req.query.country as string)?.split(',') || [],
      state: (req.query.state as string)?.split(',') || [],
      status: 'ACTIVE',
      conditions: {
        country: {
          not: {
            contains: 'India',
          },
        },
      },
    });

    const data = await getPaginatedTours({
      query: filters,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortOrder: (req.query.order as 'asc' | 'desc') || 'desc',
    });

    res.status(200).json(new AppResponse(200, data, 'Success'));
  },
);

const updateTourStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const status = req.body.status;

  if (req.user.role == 'ADMIN') {
    const tour = await Tour.findByIdAndUpdate(id, {
      status,
    });
    return res
      .status(200)
      .json(new AppResponse(200, tour, 'Status updated successfully'));
  }

  return res
    .status(400)
    .json(new AppResponse(400, null, 'You are not an admin'));
});

export const createTour = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    price,
    comparePrice,
    duration,
    departureDate,
    groupSize,
    itinerary,
    city,
    state,
    country,
    status,
    isFeatured,
    images,
  } = req.body;
  const tour = await Tour.create({
    title,
    description,
    price: parseFloat(price),
    comparePrice: parseFloat(comparePrice),
    duration,
    departureDate,
    groupSize,
    itinerary,
    city,
    state,
    country,
    status,
    user: req.user.id,
    isFeatured: isFeatured,
    images,
  });

  res
    .status(201)
    .json(new AppResponse(201, tour, 'Tour Created Successfully!'));
});

export const updateTour = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    price,
    comparePrice,
    duration,
    departureDate,
    groupSize,
    itinerary,
    city,
    state,
    country,
    status,
    isFeatured,
    images,
  } = req.body;

  // AGENT
  if (req.user.role == 'AGENT') {
    const tour = await Tour.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        title,
        description,
        price: parseFloat(price),
        comparePrice: parseFloat(comparePrice),
        duration,
        departureDate,
        groupSize,
        itinerary,
        city,
        state,
        country,
        status,
        isFeatured: isFeatured,
        images,
      },
      { new: true },
    );

    if (!tour) throw new AppError(400, 'Tour not found');

    res
      .status(200)
      .json(new AppResponse(200, { tour }, 'Tour Updated Successfully!'));
  }

  // ADMIN
  if (req.user.role == 'ADMIN') {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price: parseFloat(price),
        comparePrice: parseFloat(comparePrice),
        duration,
        departureDate,
        groupSize,
        itinerary,
        city,
        state,
        country,
        status,
        isFeatured: isFeatured,
        images,
      },
      { new: true },
    );

    if (!tour) throw new AppError(400, 'Tour not found');

    res
      .status(200)
      .json(new AppResponse(200, tour, 'Tour Updated Successfully!'));
  }
});

export const deleteTour = asyncHandler(async (req: Request, res: Response) => {
  if (req.user.role == 'AGENT') {
    const tour = await Tour.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res
      .status(200)
      .json(new AppResponse(200, tour, 'Tour Deleted Successfully!'));
  }

  if (req.user.role == 'ADMIN') {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(new AppResponse(200, tour, 'Tour Deleted Successfully!'));
  }
});

const tours = {
  getAllTours,
  getAllFeaturedTours,
  getTourById,
  getCitiesNStates,
  getAllInternationTours,
  createTour,
  updateTour,
  deleteTour,
  getAllToursByAgent,
  updateTourStatus,
};

export default tours;
