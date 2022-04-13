const { now } = require("mongoose");
const db = require("../models");
const Tutorial = db.records;

// Retrieve records from the database for given filters.
exports.filter = (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const minCount = req.body.minCount;
  const maxCount = req.body.maxCount;

// Do conditional checks on params
// var condition1 = startDate ? "" : {};

var condition = {
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

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};