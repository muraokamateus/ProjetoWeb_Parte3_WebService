const router = require('express').Router();
const Article = require('../model/Article');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'batata';

router.get('/search', async (req, res) => {
    const { token } = req.query
    const { title } = req.query
    const regex = new RegExp(title, 'i')

    try{
        jwt.verify(token, JWT_SECRET)
        const response = await Article.find({ title: { $regex: regex } })

        if(response.length === 0) {
            res.status(201)
            return res.json({ status: 'error', error: 'Essa entrada não existe no banco de dados.' })
        } else {
            console.log(response)
            return res.json({ status: 'found', data: response })
        }
    } catch(error) {
        res.status(404)
        return res.json({ status: 'error', error:'Usuário não está logado'})
    }
});

router.post('/register', async (req, res) => {
    const { token } = req.body
    const { title, link  } = req.body

    try{
        jwt.verify(token, JWT_SECRET)
        const response = await Article.create({
           title,
           link
        })
        console.log(response)
    } catch(error) {
        if(error.code === 11000){
            res.status(201)
            return res.json({ status: 'error', error: 'Artigo já registrado' })
        }else {
            res.status(404)
            return res.json({ status: 'error', error:'Usuário não está logado'})
        }
        throw error
    }
    //res.json({ status: 'ok' })
});

module.exports = router;