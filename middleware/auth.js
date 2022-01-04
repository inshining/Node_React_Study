const { User } = require('../models/User');

let auth = (req, res, next) => {

    // 인증 처리하는 곳

    // 클라이언트 쿠키에서 토큰 가져오기 
    let token = req.cookies.x_auth


    // 토큰을 복호화한 다음에 유저를 찾기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    });
    // 유저가 있으면 인증 가능

    // 유저 없으면 인증 X
};

module.exports = { auth };