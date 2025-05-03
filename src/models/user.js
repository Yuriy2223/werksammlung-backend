import mongoose from "mongoose";

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    de: { type: String, required: true },
    ua: { type: String, required: true },
  },
  { _id: false }
);

const avatarSchema = new mongoose.Schema(
  {
    data: Buffer,
    contentType: String,
    filename: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: localizedStringSchema,
      required: true,
    },
    lastName: {
      type: localizedStringSchema,
      required: true,
    },
    about: {
      type: localizedStringSchema,
      required: true,
    },
    gitHub: String,
    linkedin: String,
    telegram: String,
    viewCV: String,
    technologies: [String],
    avatarUrl: avatarSchema,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;

  if (obj.avatarUrl?.data && obj.avatarUrl?.contentType) {
    obj.avatarUrl = `data:${
      obj.avatarUrl.contentType
    };base64,${obj.avatarUrl.data.toString("base64")}`;
  }

  return obj;
};

export const User = mongoose.model("User", userSchema);
