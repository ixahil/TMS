// import { FilterQuery } from 'mongoose';
// import { Tour } from '../models/tour.model';

// interface GetToursOptions {
//   search?: string;
//   state?: string[];
//   country?: string[];
//   page?: number;
//   limit?: number;
//   sortOrder?: 'asc' | 'desc';
//   status?: 'ACTIVE' | 'DRAFT'; // optional
//   conditions?: FilterQuery<typeof Tour>; // for additional filters
// }

// export const getToursWithPagination = async ({
//   search = '',
//   state = [],
//   country = [],
//   page = 1,
//   limit = 10,
//   sortOrder = 'desc',
//   status,
//   conditions = {},
// }: GetToursOptions) => {
//   const query: FilterQuery<typeof Tour> = {
//     ...conditions,
//     ...(search && { title: { $regex: search, $options: 'i' } }),
//     ...(state.length > 0 && { state: { $in: state } }),
//     ...(country.length > 0 && { country: { $in: country } }),
//     ...(status && { status }), // only apply status if provided
//   };

//   const skip = (Math.max(1, page) - 1) * limit;

//   const [tours, totalCount] = await Promise.all([
//     Tour.find(query)
//       .sort({ createdAt: sortOrder === 'asc' ? 1 : -1 })
//       .skip(skip)
//       .limit(limit),
//     Tour.countDocuments(query),
//   ]);

//   return {
//     tours,
//     pagination: {
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//       currentPage: page,
//       pageSize: limit,
//     },
//   };
// };

import { FilterQuery } from 'mongoose';
import { Tour } from '../models/tour.model';

interface GetToursOptions {
  search?: string;
  state?: string[];
  country?: string[];
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  status?: 'ACTIVE' | 'DRAFT';
  conditions?: FilterQuery<typeof Tour>;
}

// 1. Build filter query based on filters
export const buildTourQuery = ({
  search = '',
  state = [],
  country = [],
  status,
  conditions = {},
}: Partial<GetToursOptions>): FilterQuery<typeof Tour> => {
  return {
    ...conditions,
    ...(search && { title: { $regex: search, $options: 'i' } }),
    ...(state.length > 0 && { state: { $in: state } }),
    ...(country.length > 0 && { country: { $in: country } }),
    ...(status && { status }),
  };
};

// 2. Use the query to fetch paginated results
export const getPaginatedTours = async ({
  query,
  page = 1,
  limit = 10,
  sortOrder = 'desc',
}: {
  query: FilterQuery<typeof Tour>;
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
}) => {
  const skip = (Math.max(1, page) - 1) * limit;

  const [tours, totalCount] = await Promise.all([
    Tour.find(query)
      .sort({ createdAt: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('user'),
    Tour.countDocuments(query),
  ]);

  return {
    tours,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      pageSize: limit,
    },
  };
};
