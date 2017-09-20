module.exports = app => {
    app.get('/', 'home.index');
    app.post('/users', 'user.create');
    app.get('/users/getUserList', 'user.getUserList');
    app.get('/getCaptcha', 'user.getCaptcha');
};