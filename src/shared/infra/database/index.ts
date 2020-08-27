import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
