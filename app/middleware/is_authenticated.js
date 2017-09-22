module.exports = () => {
    return async function isAuthenticated(ctx, next) {
        const userId = ctx.headers.userId || ctx.headers.userid;
        this.userId = userId;
        if (!userId || userId.length != 24) {
            return ctx.body = {
                status: 1,
                msg: "FAILED_WORONG_USERID",
            };
        }
        this.user = await ctx.service.user.findById(userId);
        if (!this.user) {
            return ctx.body = {
                status: 1,
                msg: "FAILED_LOGIN_REQUIRED",
            };
        }
        await next();
    }
};