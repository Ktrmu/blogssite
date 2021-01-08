const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const article = require('./models/article');
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
require('dotenv').config();
const app = express();

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: 
true, useUnifiedTopology: true, useCreateIndex: true})

app.set('view engine', 'ejs')
app.set( 'port', ( process.env.PORT || 3000 ));

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async(req, res)=>{
   const articles = await Article.find().sort({createdAt: 'desc'}) 
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(5000);