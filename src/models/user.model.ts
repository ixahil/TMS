import mongoose, {
  InferSchemaType,
  Model,
  model,
  Schema,
  Types,
} from 'mongoose';
import { AppError } from '../utils/global/app.error';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type IUserRole = 'ADMIN' | 'USER' | 'AGENT';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'USER',
    enum: ['USER', 'ADMIN', 'AGENT'],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'SUSPENDED', 'UNDER_REVIEW'],
  },
});

UserSchema.pre('save', function (next) {
  try {
    if (this.role == 'AGENT') {
      if (this.isModified('name') || !this.slug) {
        this.slug = this.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      next();
    }
    next();
  } catch (error) {
    throw new AppError(400, 'Try another name');
  }
});

UserSchema.statics.checkIfExists = async function (
  email: string,
  mode: 'register' | 'login',
) {
  const existingUser = await this.findOne({ email });

  if (mode === 'register' && existingUser) {
    throw new AppError(400, 'User already exists, please login!');
  }

  if (mode === 'login' && !existingUser) {
    throw new AppError(400, 'Invalid Credentials');
  }

  return existingUser;
};
export type UserType = InferSchemaType<typeof UserSchema>;

export const User = mongoose.model<UserType>('User', UserSchema);
