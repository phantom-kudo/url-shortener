// import mongoose from 'mongoose'
import ShortUrl from '../models/shortUrlmodel';
// import mongoose from 'mongoose';

export const getAllUrl = async (req,res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', {shortUrls : shortUrls});
} 

export const postUrl = async (req,res) => {
    await ShortUrl.create({original : req.body.originalUrl});
    res.redirect('/');
}

export const redirectShortUrl = async (req,res) => {
    const shortUrl = await ShortUrl.findOne({short : req.params.shortUrl});
    if(shortUrl == null) res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.original);
}
