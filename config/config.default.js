exports.keys = "abcd!@#$";

exports.mongoose = {
    url: 'mongodb://127.0.0.1/egg-example',
    options: {}
  };

exports.middleware = [
    'robot',
    'errorHandler'
];

exports.robot = {
    ua: [
      /curl/i,
      /Baiduspider/i,
    ],
};