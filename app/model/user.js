module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        nickname:{
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
  
    return mongoose.model('User', UserSchema);
}