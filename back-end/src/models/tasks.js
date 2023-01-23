const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: 'status',
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      default: 0,
    },
    subtasks: [
      {
        title: {
          type: String,
          required: true,
        },
        complete: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const task = mongoose.model('task', TaskSchema);
module.exports = task;
