module.exports = app => {
    app.get('/api', 'home.index');
    app.post('/api/login', 'user.login');
    app.post('/api/register', 'user.register');
    // app.post('/api/users', 'user.create');
    // app.get('/api/users/getUserList', 'user.getUserList');
    // app.get('/api/getCaptcha', 'user.getCaptcha');
};