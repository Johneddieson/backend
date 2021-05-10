const express = require('express')


const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
const groceriesRoutes = require('./routes/groceries')
const gamesroute = require('./routes/games')
const cookie = require('cookie-parser')
const errorController = require('./controllers/error')
const app = express();

const ports = process.env.PORT || 3000;

app.use(express.json())
//app.use(express.urlencoded({extended: false}))
app.use(cookie())
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Custom-Header, Authorization');
    
            if (req.method === 'OPTIONS') {
                return res.status(200).end()
            }
        next()
    
    })


    app.use('/auth', authRoutes);
    
    app.use('/post', postsRoutes);
        app.use('/groceries', groceriesRoutes)
        app.use('/api/games', gamesroute)
    app.use(errorController.get404)

    app.use(errorController.get500)

    


app.listen(ports, () => {
    console.log(`Listening on PORT ${ports}`)
})

