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

exports.jwt = {
    enable: true,
    secret: '123456',
    ignore: /^(\/api\/login|\/api\/register|\/api\/index)/
};

exports.security = {
    csrf: {
        enable: false,
    },
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};
