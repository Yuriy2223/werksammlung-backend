import mongoose from "mongoose";

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    de: { type: String, required: true },
    ua: { type: String, required: true },
  },
  { _id: false }
);

const uploadSchema = new mongoose.Schema(
  {
    data: Buffer,
    contentType: String,
    filename: String,
  },
  { _id: false }
);

const skillItemSchema = new mongoose.Schema(
  {
    name: { type: localizedStringSchema, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const skillCategorySchema = new mongoose.Schema(
  {
    category: { type: localizedStringSchema, required: true },
    items: { type: [skillItemSchema], required: true },
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
    avatarUrl: uploadSchema,
    viewCV: uploadSchema,
    skills: [skillCategorySchema],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
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

  if (obj.viewCV) {
    obj.viewCV = `/api/uploads/cv/${obj._id}`;
  }

  return obj;
};

export const User = mongoose.model("User", userSchema);
