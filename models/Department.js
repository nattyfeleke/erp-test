const {Schema, model} = require('mongoose');

const DepartmentSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    has_managing_dept:{
        type: Boolean,
        default: true
    },
    managing_dept: {
      type: Schema.Types.ObjectId,
      ref: 'department',
    },
    children_dept: [{
        type: Schema.Types.ObjectId,
        ref: 'department',
      }],
  },
  {
    timestamps: true,
  }
);

module.exports = Department = model('department', DepartmentSchema);
