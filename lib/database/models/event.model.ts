import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: number;
  isFree: boolean;
  limit: number;
  noLimit: boolean;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
  attendees: { _id: string }[];
  canceled: boolean;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: Number },
  isFree: { type: Boolean, default: false },
  limit: { type: Number },
  noLimit: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  canceled: { type: Boolean, default: false },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
