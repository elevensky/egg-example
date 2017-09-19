module.exports = app => {
    app.get('/', app.controller.home.index);
    app.get('/users/getUserList', app.controller.users.getUserList);
};