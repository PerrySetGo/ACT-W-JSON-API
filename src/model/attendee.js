import mongoose from 'mongoose';
import Review from './review'

let Schema = mongoose.Schema;

let attendeeSchema = new Schema({
  age_range: {
    type:String,
    required: true
  },
  ethnicity: {
    type: String,
    required: true
  },
  job_category: {
    type: String,
    required: true
  },
  gender : {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Attendee', attendeeSchema);
