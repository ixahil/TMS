import { HydratedDocument, model, Schema, Types } from 'mongoose';
import { mailSender } from '../lib/mailSender.js';
import { AppError } from '../utils/global/app.error.js';
import { User } from './user.model.js';

interface IOtp {
  user: Types.ObjectId;
  otp: string;
  createdAt: Date;
}

const OTPSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // Delete document after 5 minutes
  },
});

async function sendVerificationEmail(email: string, otp: number) {
  try {
    const body = `
      <h2>Please confirm your OTP: </h2>
      <h3><strong>${otp}</strong></h3>
      <p>This OTP is valid for 5 minutes.</p>
    `;

    const mailResponse = await mailSender(
      email,
      'Account Verification Email',
      body,
    );
    console.log('Email sent successfully: ', mailResponse);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error occurred while sending verification email:', error);
      throw new AppError(
        500,
        'Error occurred while sending verification email',
        [error.message],
        error.stack,
      );
    } else {
      console.log('Unknown error:', error);
      throw new AppError(500, 'Unknown error occurred while sending email');
    }
  }
}

OTPSchema.pre('save', async function (next) {
  try {
    const doc = this as HydratedDocument<IOtp>;

    // Only run on new documents
    if (doc.isNew) {
      if (!doc.user) {
        throw new Error('User is required to send verification email.');
      }

      const user = await User.findById(doc.user);
      if (!user) {
        throw new Error('User not found.');
      }

      const otpNumber = parseInt(doc.otp, 10);
      if (isNaN(otpNumber)) {
        throw new Error('OTP is not a valid number.');
      }

      await sendVerificationEmail(user.email, otpNumber);
    }

    next();
  } catch (err) {
    next(err as Error); // Pass error to Mongoose
  }
});
export const OTP = model('OTP', OTPSchema);
