module.exports = app => {
    app.get('/api', 'home.index');

    // 用户相关api
    app.post('/api/login', 'user.login');
    app.post('/api/register', 'user.register');

    app.get('/api/user/info', 'user.info');
    // app.post('/api/users', 'user.create');
    // app.get('/api/users/getUserList', 'user.getUserList');
    // app.get('/api/getCaptcha', 'user.getCaptcha');
};