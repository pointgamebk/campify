import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  stripeAccountId: { type: String, default: null },
  chargesEnabled: { type: Boolean, default: false },
  photo: { type: String, required: true },
  profilePhoto: { type: String, required: false },
  profileDescription: { type: String, required: false },
  profileSchool: { type: String, required: false },
  profileContact: { type: String, required: false },
  profileCompleted: { type: Boolean, default: false },
});

const User = models.User || model("User", UserSchema);

export default User;
