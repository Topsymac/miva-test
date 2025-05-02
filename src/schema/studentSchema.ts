import mongoose from "mongoose";

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  registrationNumber: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
