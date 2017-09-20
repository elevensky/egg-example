module.exports = () => {
    return async function isAuthenticated(next) {
        const userId = this.request.headers.userId || this.request.headers.userid;
        this.userId = userId;
        if (!userId || userId.length != 24) {
            return this.body = {
                status: 1,
                msg: "FAILED_WORONG_USERID",
            };
        }
        this.user = await this.ctx.service.user.findById(userId);
        if (!this.user) {
            return this.body = {
                status: 1,
                msg: "FAILED_LOGIN_REQUIRED",
            };
        }
        await next;
    }
};