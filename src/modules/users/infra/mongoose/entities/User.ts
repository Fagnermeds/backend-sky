import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSchema extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phones: { _id: mongoose.Types.ObjectId }[];
  // eslint-disable-next-line camelcase
  last_login?: Date;
}

const UserSchema = new Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phones: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Phone',
      },
    ],
    last_login: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUserSchema>('User', UserSchema);

export default User;
