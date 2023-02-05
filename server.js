import express from 'express';
import mongoose from 'mongoose';
// import ShortUrl from './models/shortUrlmodel.js';
// import urlRouter from './routers/urlroutes.js';
const app = express();
const PORT = process.env.PORT || 8080;
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}));

// app.use('/api/user',urlRouter);

app.get("/",async (req,res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', {shortUrls : shortUrls});
});

app.post("/shortUrls", async (req,res) => {
    await ShortUrl.create({original : req.body.originalUrl});
    res.redirect('/');
});

app.get("/:shortUrl", async (req,res) => {
    const shortUrl = await ShortUrl.findOne({short : req.params.shortUrl});
    if(shortUrl == null) res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.original);
});

const uri = "mongodb+srv://phantom24:phantom24@url-shortener.33ivthk.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    app.listen(PORT)
})
.then(() => {
    console.log(`DB is connected and app is listening to ${PORT}`)
})
.catch((err) => {
    console.log(err);
})

