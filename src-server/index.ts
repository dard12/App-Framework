import express from 'express';
import path from 'path';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const api = express.Router();
const user = express.Router();
const auth = express.Router();

export { app, api, user, auth };

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', api);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/auth', auth);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

import './create-sample-user';
import './routes/auth';
import './routes/profile';

app.listen(process.env.PORT || 8080);
