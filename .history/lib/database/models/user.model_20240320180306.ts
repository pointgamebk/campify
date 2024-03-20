import { Document, Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  stripeAccountId: { type: String, default: null },
  chargesEnabled: { type: Boolean, default: false },
  photo: { type: String, required: true },
  profilePhoto: { type: String, required: false, default: null },
  profileDescription: { type: String, required: false, default: null },
  profileSchool: { type: String, required: false, default: null },
  profileContact: { type: String, required: false, default: null },
  profileCompleted: { type: Boolean, default: false },
});

const User = models.User || model("User", UserSchema);

export default User;
