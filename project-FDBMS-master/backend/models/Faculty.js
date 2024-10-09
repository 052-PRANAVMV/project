const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const passPercentSchema = new Schema({
  examType: { type: String, enum: ['IAT-1', 'IAT-2', 'IAT-3', 'Odd' ,'Even'] },
  percentage: Number
});


const subjectSchema = new Schema({
  name: String,
  coursecode: String,
  internalPassPercentages: [passPercentSchema]
});


const certificationSchema = new Schema({
  name: String,
  issuingOrganization: String,
  description:String,
  duration: String,
  fileId: String
});


const internshipSchema = new Schema({
  organization: String,
  duration: String,
  fileId: String
});


const publicationSchema = new Schema({
  title: String,
  type: { type: String, enum: ['Research Paper', 'Journal', 'Conference Paper'] },
  category : String,
  date: Date,
  description : String,
  fileId: String
});


const awardSchema = new Schema({
  name: String,
  date: Date,
  issuer: String,
  fileId: String
});


const projectSchema = new Schema({
  title: String,
  type: { type: String, enum: ['Internal', 'External'] },
  description: String,
  startDate: Date,
  endDate: Date,
  fileId: String
});


const fundedProjectProposalSchema = new Schema({
  title: String,
  status: { type: String, enum: ['Approved', 'Rejected'] },
  dateSubmitted: Date,
  dateReviewed: Date,
  description:String ,
  fileId: String
});


const patentSchema = new Schema({
  title: String,
  p_no :String,
  dop: Date,
  description : String,
  fileId: String
});


const bookSchema = new Schema({
  title: String,
  author: String,
  academicYear: String ,
  fileId: String,
  description : String,
  ISBN : String
});


const fdpSchema = new Schema({
    name: String,
    issuingOrganization: String,
    fromDate: Date,
    toDate: Date,
    fileId: String
});

const consultancySchema = new Schema({
    name: String,
    client: String,
    duration:String,
    amount : Number,
    description: String,
    fileId: String
});

const eventSchema = new Schema({
          name:String,
          description: String,
          date:String,
          image: String
});
    

// Main Faculty Schema
const facultySchema = new Schema({
    name: String,
    empId : String,
    dob: Date,
    experiance : String,
    password : String,
    email: String,
    phone: String,
    address: String,
    educationalBackground: String,
    photoId: String ,
    resume: String,
  subjectsHandled: [subjectSchema],
  certifications: [certificationSchema],
  internships: [internshipSchema],
  publications: [publicationSchema],
  awards: [awardSchema],
  events : [eventSchema],
  projectsHandled: [projectSchema],
  fundedProjectProposals: [fundedProjectProposalSchema],
  patents: [patentSchema],
  books: [bookSchema],
  fdpsAttended: [fdpSchema], 
  consultancies: [consultancySchema]
});

module.exports = mongoose.model('Faculty', facultySchema);