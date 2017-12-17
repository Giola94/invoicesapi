/**
 * Created by g.siradze on 12/12/2017.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'User name is required'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    activated: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
};

export default mongoose.model('User', UserSchema);
