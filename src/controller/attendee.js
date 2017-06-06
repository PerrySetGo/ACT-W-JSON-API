import mongoose from 'mongoose';
import { Router } from 'express';
import Attendee from '../model/attendee';
import Review from '../model/review';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {

  function checkError(res, err){
    if (err) {
      res.send(err);
    }
  };

  let api = Router();
  // '/v1/attendee'
  api.get('/', (req, res) => {
    Attendee.find({}, (err, attendees) => {
      checkError(res, err);
      res.json(attendees);
    });
  });

  // '/v1/attendee/:id' Read 1
  api.get('/:id', (req, res) => {
    Attendee.findById(req.params.id, (err, attendee) => {
      checkError(res, err);
      res.json(attendee);
    });
  });

  // '/v1/attendee/add'
  api.post('/add', (req, res) => {
    let newAttendee = new Attendee();
    newAttendee.age_range = req.body.age_range;
    newAttendee.ethnicity = req.body.ethnicity
    newAttendee.job_category = req.body.job_category;
    newAttendee.gender = req.body.gender;

    newAttendee.save(err => {
      checkError(res, err)
      res.json({ message: `Attendee saved successfully` });
    });
  });


  api.post('/batchadd', (req, res) => {

    // let newAttendee = new Attendee();
    // newAttendee.age_range = req.body.age_range;
    // newAttendee.ethnicity = req.body.ethnicity
    // newAttendee.job_category = req.body.job_category;
    // newAttendee.gender = req.body.gender;

    // newAttendee.save(err => {
    //   checkError(res, err)
    //   res.json({ message: `Attendee saved successfully` });
    // });

    for (var i = 0; i < req.body.length; i ++ ){
      console.log(req.body[i]);
      let newAttendee = new Attendee();
      newAttendee.age_range = req.body[i].age_range;
      newAttendee.ethnicity = req.body[i].ethnicity
      newAttendee.job_category = req.body[i].job_category;
      newAttendee.gender = req.body[i].gender;

      newAttendee.save(); //need error handloing here?
    }
res.send("Batch add completed");
  });

  api.delete('/:id', authenticate, (req, res) => {
    Attendee.findById(req.params.id, (err, attendee) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (attendee === null){
        res.status(404).send("Attendee not Found");
        return;
      }
      attendee.remove({_id: req.params.id},
        (err, attendee) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.json({message: "Attendee Successfully Removed"});
            });
        });
      });

        return api;
      }
