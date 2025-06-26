import { asyncHandler } from '../../middlewares/async.handler';
import { IUser, IUserRole, User } from '../../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppError } from '../../utils/global/app.error';
import { cookieOptions, signToken } from '../../lib/jwt';
import AppResponse from '../../utils/global/app.response';
import otpGenerator from 'otp-generator';
import { OTP } from '../../models/otp.model';

export const login = (allowedRoles: IUserRole[] = []) =>
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = (await User.checkIfExists(email, 'login')) as IUser;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError(401, 'Invalid credentials');
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      throw new AppError(
        401,
        'You are not authorized to login to this resource',
      );
    }

    const token = signToken(user);

    res.status(200).cookie('AccessToken', token, cookieOptions).json(
      new AppResponse(200, {
        user,
      }),
    );
  });

export const register = (role: IUserRole) =>
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    await User.checkIfExists(email, 'register');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      role,
    });

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let otpResult = await OTP.findOne({ otp });

    while (otpResult) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });

      otpResult = await OTP.findOne({ otp });
    }

    const otpBody = await OTP.create({ user: user.id, otp });

    const response = new AppResponse(
      201,
      { user: { email: user.email } },
      'User created successfully',
    );
    return res.status(201).json(response);
  });

export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { otp, email } = req.body;

  const user = await User.findOne({ email }).select('-password');

  if (!user) {
    throw new AppError(400, 'User not exist, please signup');
  }

  if (user.isEmailVerified) {
    throw new AppError(400, 'Email is already verified!');
  }

  const otpResult = await OTP.findOneAndDelete({ otp, user: user.id });

  if (!otpResult) {
    throw new AppError(400, 'Invalid OTP!');
  }

  user.isEmailVerified = true;
  await user.save();

  const token = signToken(user);

  res
    .status(200)
    .cookie('AccessToken', token, cookieOptions)
    .json(new AppResponse(200, { user }, 'Email verified successfully!'));
});

export const resendVerification = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new AppError(400, 'Email is not registered!');
    if (user.isEmailVerified)
      throw new AppError(400, 'Email is already verified!');

    await OTP.findOneAndDelete({ user: user._id });

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let existingOTP = await OTP.findOne({ otp });

    while (existingOTP) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      existingOTP = await OTP.findOne({ otp });
    }

    const otpBody = await OTP.create({ otp, user: user.id });

    res
      .status(200)
      .json(
        new AppResponse(
          200,
          { message: 'OTP Sent Successfully' },
          'OTP sent to your mail',
        ),
      );
  },
);
