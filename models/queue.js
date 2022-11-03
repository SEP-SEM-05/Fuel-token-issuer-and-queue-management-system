const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema(
  {
    stationID: {
      type: String,
      required: true,
      unique: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    requests: {
      type: [String],
      default: [],
    },
    lastAnnouncedDate: {
      type: Date,
      default: null,
    },
    state: {
      type: String,
      enum: ["waiting", "announced", "active"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

const Queue = mongoose.model('Queue', queueSchema);
module.exports = Queue;