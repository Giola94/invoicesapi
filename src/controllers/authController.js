/**
 * Created by g.siradze on 12/12/2017.
 */
import User from '../models/user';
import jsonwebtoken from 'jsonwebtoken';

export const register = (req, res) => {
    let user = new User(req.body);

    user.password = user.hashPassword(req.body.password);

    user.save()
        .then(() => res.json(user))
        .catch(err => res.send(err));
};

export const login = (req, res) => {
    User.findOne({username: req.body.username}
    ).then((user) => {
        if (!user || !user.validatePassword(req.body.password)) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed'
            });
        }

        const response = {
            success: true,
            token: jsonwebtoken.sign({
                id: user._id
            }, process.env.JWT_SECRET)
        };

        res.json(response);
    }).catch(err => res.send(err));
};