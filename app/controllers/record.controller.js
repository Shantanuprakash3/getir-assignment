const { now } = require("mongoose");
const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');

const db = require("../models");
const Records = db.records;
const respObj = require("../helper/response.helper")

// Request validation middleware
exports.validate = (req, res, next) => {

  req.checkBody('startDate', 'startDate should be datetime').exists();
  req.checkBody('endDate', 'endDate should be datetime').exists();
  req.checkBody('minCount', 'minCount should be positive integer').isInt({ min: 0 });
  req.checkBody('maxCount', 'maxCount should be positive integer').isInt({ min: 0 });

  req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
          return res.status(400).json(respObj(0,{ errors: result.array() },[]));
      }
      return next();
  });
}

// Retrieve records from the database for given filters.
exports.filter = (req, res) => {

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const minCount = req.body.minCount;
  const maxCount = req.body.maxCount;


  var condition = { //$match : {
          "$and": [
            { createdAt: {$gt:  new Date(startDate).toISOString(), $lt:  new Date(endDate).toISOString()}},
            { $expr : {
              "$and" : [ 
                      {$gte : [
                          { $sum : ["$counts"] },
                          minCount
                      ]},
                      {$lte : [
                        { $sum : ["$counts"] },
                          maxCount
                    ]}
                  ]
              }
            }
      ]
  }

  Records.find(condition, {"key": 1, "createdAt": 1, "totalCount": { "$sum" : ["$counts"] }} )
    .then(data => {
      res.send(respObj(1, 'success', data));
    })
    .catch(err => {
      res.status(500).send(respObj(0, err.message || "Some error occurred while retrieving tutorials.",[]))});
};
