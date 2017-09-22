const captcha = require('trek-captcha')
const createRule = {
    name: 'string',
    password: 'string',
};
module.exports = app => {
    class UserController extends app.Controller {
        async create() {
            const { ctx } = this;
            ctx.validate(createRule);
            const id = await ctx.service.user.create(ctx.request.body);
            ctx.body = {
                topic_id: id,
            };
            ctx.status = 201;
        }
        getUserList() {
            this.ctx.body = [
                {name: 'user1', age: 20},
                {name: 'user2', age: 30}
            ];
        }
        async getCaptcha() {
            const { ctx } = this;
            const { token, buffer } = await captcha({size:6})
            ctx.session.captcha = token
            ctx.status = 200
            ctx.body = buffer
        }
    }
    return UserController;
};