import { Request, Response } from 'express';
import { asyncHandler } from '../../middlewares/async.handler';
import { User } from '../../models/user.model';
import { AppError } from '../../utils/global/app.error';
import AppResponse from '../../utils/global/app.response';

const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user.id) {
    throw new AppError(401, 'please login first');
  }
  return res.status(200).json(new AppResponse(200, req.user));
});

const getActiveUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user || user.id !== req.user.id) {
    throw new AppError(401, 'please login first');
  }
  return res.status(200).json(new AppResponse(200, req.user));
});
const getAgents = asyncHandler(async (req: Request, res: Response) => {
  const agents = await User.find({ role: 'AGENT' }).select('-password');
  return res.status(200).json(new AppResponse(200, { users: agents }));
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const agents = await User.find({ role: 'USER' }).select('-password');
  return res.status(200).json(new AppResponse(200, { users: agents }));
});
const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, profile } = req.body;

  if (req.user.id != req.params.id) {
    throw new AppError(403, 'you are not allowed to update this user');
  }

  const user = await User.findByIdAndUpdate(req.user.id, {
    name: name,
    phone: phone,
    profile: profile,
  }).select('-password');

  if (!user) throw new AppError(400, 'user not exist');

  return res.status(200).json(new AppResponse(200, user));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie('AccessToken')
    .json(new AppResponse(200, 'Logged out successfully'));
});

const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const status = req.body.status;

  const user = await User.findByIdAndUpdate(id, {
    status,
  }).select('-password');

  return res
    .status(200)
    .json(new AppResponse(200, user, 'Status updated successfully'));
});

const userController = {
  getActiveUser,
  getAgents,
  getUsers,
  updateUserStatus,
  updateProfile,
  logout,
  getMe,
};

export default userController;
