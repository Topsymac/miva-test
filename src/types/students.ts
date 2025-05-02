export interface Students {
  _id?: string;
  name: string;
  registrationNumber: string;
  dob: string;
  major: string;
  gpa: number;
 
}


// import mongoose from 'mongoose';

// const StudentSchema = new mongoose.Schema(
//   {
//     name: String,
//     registrationNumber: String,
//     major: String,
//     dob: String,
//     gpa: Number,
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
