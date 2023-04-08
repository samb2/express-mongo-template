import passport from 'passport';
import passportJWT, { VerifiedCallback } from 'passport-jwt';
import User from '../../database/model/user';
import { UserDto } from '../../api/dtos/user.dto';
import { JwtPayload } from 'jsonwebtoken';

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use(
    'jwt',
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: Config.jwt.secret_key,
        },
        async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
            try {
                // Select User by id
                const user: UserDto = await User.findById(jwtPayload.id);
                // User is Exist
                if (user) return done(null, user);
                return done(null, false);
            } catch (err: any) {
                return done(err);
            }
        },
    ),
);
