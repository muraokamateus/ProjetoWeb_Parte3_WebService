const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'batata';


router.get('/login', async (req, res) => {
    const {email, password } = req.query;
    const user = await User.findOne({ email }).lean();
    if (!user) {
        res.status(201);
        return res.json({status: 'error', error: 'Usuario ou Senha Invalidos!'});
    }
    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        JWT_SECRET
        )
        return res.json({ status: 'ok', data: token })
    }

    res.status(201)
    res.json({ status: 'error', error: 'Usuario ou Senha Invalidos!'})
});

router.post('/register', async (req, res)=>{
    const { email, password: plainTextPassword } = req.body
    const password = await bcrypt.hash(plainTextPassword, 10)

    try{
        const response = await User.create({
            email,
            password
        })
        console.log(response)
    } catch(error) {
        if(error.code === 11000){
            res.status(201)
            return res.json({ status: 'error', error: 'Usuário já cadastrado.' })
        }
        throw error
    }
    res.json({ status: 'ok' })
});

module.exports = router;