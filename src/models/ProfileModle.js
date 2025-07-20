const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    FirstName: { type: String,  required: [true, ' FirstName is required!'] },
    LastName: { type: String, required: false },
    EmailAddress: { type: String },
    MobileNumber: {
      type: String, 
      validate: {
        validator: function (value) {
          return /^(?:\+88|88)?01[3-9]\d{8}$/.test(value);
        },
        message:
          "Please enter a valid Bangladeshi mobile number (e.g., 017xxxxxxxx or +88017xxxxxxxx).",
      },
    },
    City: { type: String, default: 'Jashore, Bangladesh' },
    UserName: { type: String, unique: true },
    Password: {
  type: String,
  required: [true, 'Password is required!'],
  validate: {
    validator: function (value) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/.test(
        value
      );
    },
    message:
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
  },
},

  },
  { versionKey: false }
);

const ProfileModel = mongoose.model('Profile', DataSchema);
module.exports = ProfileModel;
