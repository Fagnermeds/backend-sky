import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSchema extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phones: [{ _id: mongoose.Types.ObjectId }];
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
/*
import { prop, Ref, arrayProp } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

import Phone from './Phone';

class User extends Base<string> {
  @prop({ type: String })
  public _id: string;

  @prop({
    type: String,
    required: true,
  })
  public name: string;

  @prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  })
  public email: string;

  @prop({
    type: String,
    required: true,
    select: false,
  })
  public password: string;

  @arrayProp({ ref: 'Phone' })
  public phones: Ref<Phone>[];

  constructor() {
    super();
  }
}

export default User; */
