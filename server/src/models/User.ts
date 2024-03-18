import mongoose, { Model,Schema} from 'mongoose';
import IUser from '../interfaces/IUser';

// Define the schema for the User model
const userSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true ,unique: true },
  password: { type: String, required: true },
  create_date: { type: Date, default: Date.now, required: true },
  update_date: { type: Date, default: Date.now },
  delete_date: { type: Date },
});

// Create the User model
const UserModel : Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;
