import mongoose, { Schema, Document } from "mongoose";

export interface IPlaylist {
  id: string;
  name: string;
  songs: string[];
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  likedSongs: string[];
  playlists: IPlaylist[];
  createdAt: Date;
}

const PlaylistSchema = new Schema({
  id: String,
  name: String,
  songs: [String],
});

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    likedSongs: {
      type: [String],
      default: [],
    },
    playlists: {
      type: [PlaylistSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;