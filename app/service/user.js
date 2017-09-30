module.exports = app => {
    return class User extends app.Service {
        // 默认不需要提供构造函数。
        // constructor(ctx) {
        //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
        //   // 就可以直接通过 this.ctx 获取 ctx 了
        //   // 还可以直接通过 this.app 获取 app 了
        // }
        async create(user) {
            const User = this.ctx.model.User
            let newUser = new User(user)
            newUser.role = 'user'
            const res = await newUser.save()
            return res;
        }

        async findById(uid) {
            // 假如 我们拿到用户 id 从数据库获取用户详细信息
            const user = await ctx.model.User.findById(uid);
            return { user }
        }

        async findUserByEmail(email) {
            const user = await this.ctx.model.User.findOne({ email: email });
            return user;
        }
    }
};