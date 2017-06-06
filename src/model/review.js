import mongoose from 'mongoose';
import attendee from './attendee';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: { //way to declare validators
    type: String,
    required: true
  },
  text : String,
  attendee: {
    type:Schema.Types.ObjectId,
    ref: 'attendee',
    required:true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
