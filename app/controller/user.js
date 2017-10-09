const captcha = require('trek-captcha')

module.exports = app => {
    class UserController extends app.Controller {
        async login() {
            const { ctx, service } = this;
            const {email, password} = ctx.request.body;
            const createRule = {
                email: { type: 'string' },
                password: { type: 'string' },
            };
            // 校验参数
            // ctx.validate(createRule);
            try {
                const user = await service.user.findUserByEmail(email)
                const isMatch = await user.comparePassword(password);
                if(!isMatch){
                  ctx.throw(423, '用户名或密码错误！')
                }
                const token = app.jwt.sign({ id: user._id }, app.config.jwt.secret);
                ctx.body = {
                  code: 200,
                  token: token,
                  message: '登录成功!',
                }
            } catch(e) {
                ctx.throw(e)
            }
        }

        async register() {
            const { ctx, service } = this;
            const createRule = {
                name: 'string',
                email: 'string',
                password: 'string',
                repassword: 'string'
            };
            ctx.validate(createRule);
            /* 检测邮箱是否存在
                const user = await ctx.service.user.findUserByEmail(email);
                if(!user){
                    ctx.throw(423, '此用户名已注册！')
                }
            */

            const data = await service.user.create(ctx.request.body);
            ctx.body = {
              _id: data._id,
            };
            ctx.status = 201;
        }

        async info() {
            const { ctx, service } = this;
            const user = ctx.state.user;
            const userInfo = await service.user.findById(user.id);
            ctx.body = {
                userInfo,
            };
            ctx.status = 200;
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
