import express from 'express';
import { getAllUrl, postUrl, redirectShortUrl } from "../controllers/urlController.js";
const urlRouter = express.Router();

urlRouter.get('/', getAllUrl);
urlRouter.post('/shortUrls', postUrl);
urlRouter.get('/:shortUrl', redirectShortUrl);

export default urlRouter;