import { model, Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword: (p: string) => Promise<boolean>
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if(!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  next();
})

userSchema.methods.comparePassword = async function (password: string):  Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

export default model<IUser>("User", userSchema);