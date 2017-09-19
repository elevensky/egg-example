module.exports = app => {
    class UsersController extends app.Controller {
        * getUserList() {
            this.ctx.body = [
                {name: 'user1', age: 20},
                {name: 'user2', age: 30}
            ];
        }
    }
    return UsersController;
};