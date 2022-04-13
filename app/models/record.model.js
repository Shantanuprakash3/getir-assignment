module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      key: String,
      value: String,
      createdAt: { type: Date, default: Date.now },
      count: [Number],
      counts: [Number],
      id: String
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Record = mongoose.model("record", schema);
  return Record;
};
