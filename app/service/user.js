module.exports = app => {
    return class User extends app.Service {
        async create(user) {
            // const User = ctx.model.User;
            // let newUser = new User(user)
            // newUser.role = 'user'
            // const res = await newUser.save()
            ctx.body = { success: true, data: user }
            ctx.status = 200
        }

        async findById(uid) {
            // 假如 我们拿到用户 id 从数据库获取用户详细信息
            const user = await ctx.model.User.find('users', {
                id: 1,
            });
            return { user }
        }
    }
};