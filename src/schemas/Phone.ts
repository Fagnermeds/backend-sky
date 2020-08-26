import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoneSchema extends Document {
  ddd: string;
  number: string;
}

const PhoneSchema = new Schema({
  ddd: {
    type: String,
    required: true,
    maxlength: 2,
    minlength: 2,
  },
  number: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 9,
  },
});

const Phone = mongoose.model<IPhoneSchema>('Phone', PhoneSchema);

export default Phone;
