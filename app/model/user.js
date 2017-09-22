/**
 * 用户表
 */
const crypto = require('crypto')

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema
    const UserSchema = new mongoose.Schema({
        name:{
            type:String,
            unique: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
        },
        provider: {
            type:String,
            default:'local'
        },
        weibo: {
            id: String,
            token: String,
            email: String,
            name: String
        },
        qq: {
            id: String,
            token: String,
            email: String,
            name: String
        },
        likeList: [{
            type:Schema.Types.ObjectId,
            ref:'Article'
        }],
        hashedPassword: String,
        salt: String,
        role: {
            type : String ,
            default : 'user'
        },
        avatar: String,
        status: {
            type:Number,
            default:0
        },
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    });

    /**
     * Virtuals
     */
    UserSchema
    .virtual('password')
    .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
    })
    .get(function() {
    return this._password
    })


    UserSchema
    .virtual('userInfo')
    .get(function() {
    return {
        'nickname': this.nickname,
        'role': this.role,
        'email': this.email,
        'avatar': this.avatar,
        'likes':this.likeList,
        'provider':this.provider
    }
    })

    UserSchema
    .virtual('providerInfo')
    .get(function() {
    return {
        'qq': this.qq,
        'github': this.github,
        'weibo': this.weibo,
        'facebook': this.facebook,
        'google':this.google,
        'twitter':this.twitter
    }
    })

    // Non-sensitive info we'll be putting in the token
    UserSchema
    .virtual('token')
    .get(function() {
    return {
        '_id': this._id,
        'role': this.role
    }
    })

    UserSchema
    .path('name')
    .validate({
        isAsync: true,
        validator: function(v, cb) {
            const self = this
            self.constructor.findOne({ name: v }, function(err, user) {
                if (user && self.id !== user.id) {
                    cb(false)
                }
                cb(true)
            })
        },
        message: '这个呢称已经被使用!',
    })

    UserSchema
    .path('email')
    .validate({
        isAsync: true,
        validator: function(v, cb) {
            const self = this
            self.constructor.findOne({ email: v }, function(err, user) {
                if (user && self.id !== user.id) {
                    cb(false)
                }
                cb(true)
            })
        },
        message: '这个email已经被使用!',
    })
    /**
    * methods
    */
    UserSchema.methods = {
        //检查用户权限
        hasRole: function(role) {
            var selfRoles = this.role
            return (selfRoles.indexOf('admin') !== -1 || selfRoles.indexOf(role) !== -1)
        },
        //验证用户密码
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hashedPassword
        },
        //生成盐
        makeSalt: function() {
            return crypto.randomBytes(16).toString('base64')
        },
        //生成密码
        encryptPassword: function(password) {
            if (!password || !this.salt) return ''
            var salt = new Buffer(this.salt, 'base64')
            return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
        }
    }

    UserSchema.set('toObject', { virtuals: true })

    return mongoose.model('User', UserSchema);
}