/**
 * Created by g.siradze on 12/13/2017.
 */
import jsonwebtoken from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jsonwebtoken.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.token = bearerToken;
                req.userid = data.id;

                next();
            }
        });

    } else {
        res.sendStatus(403);
    }
};

export default authMiddleware;