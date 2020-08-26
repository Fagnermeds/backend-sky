import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/api-sky', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
