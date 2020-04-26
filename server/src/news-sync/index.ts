import { NewsApi } from "./api/news-api";
import { wait } from "./utils";
import Article from "../entity/Article";
import Source from "../entity/Source";
import { Connection } from "typeorm";
import { getPositivity } from "./categorizer/categorize";
import linkPreview = require('linkpreview-for-node');

const API_KEY = process.env['NEWS_API_KEY'];

if (!API_KEY) {
    throw new Error('Failed to start news API server as no API key was specified');
}

const api = new NewsApi(API_KEY);
const THROTTLE = 5 * 60 * 1000;

export async function getSources(con: Connection) {
    const sourceRepo = await con.getRepository(Source);
    const sources = await api.getSources();
    
    if (sources.status === 'error'){ 
        console.error(sources);
        throw new Error('failed to fetch');
    }

    const toSave = sources.sources.map(async (source) => {
        const exists = await sourceRepo.count({
            name: source.name
        });
        if (exists) {
            return;
        }
        const ormSource = new Source();
        ormSource.name = source.name;
        ormSource.category = source.category;
        ormSource.language = source.language;
        ormSource.url = source.url;
        ormSource.country = source.country;
        ormSource.description = source.description;
        return ormSource;
    });

    for (const model of toSave) {
        const toSaveModel = await model;

        if (!toSaveModel) {
            continue;
        }

        await sourceRepo.save(toSaveModel);
    }
}

export async function findArticles(con: Connection) {
    const sourceRepo = await con.getRepository(Source);
    const articleRepo = await con.getRepository(Article);
    
    while (true) {
        console.log('Checking Articles');
        try { 
            const articles = await api.getAll('en', 100);
            if (articles.status === 'error'){ 
                console.error(articles);
                throw new Error('failed to fetch');
            }
            const toSave = articles.articles.map(async (article) => {
                const exists = await articleRepo.count({
                    url: article.url
                });
                if (exists) {
                    return;
                }
                console.log('Adding article', article.title);
                const ormArticle = new Article();
                ormArticle.author = article.author;
                ormArticle.content = article.content;
                ormArticle.description = article.description;
                ormArticle.imageUrl = article.urlToImage;
                ormArticle.published = new Date(article.publishedAt);
                ormArticle.source = await sourceRepo.findOne({
                    name: article.source.name,
                });
                ormArticle.title = article.title;
                ormArticle.url = article.url;
                ormArticle.sentiment = getPositivity(`${article.title} ${article.description} ${article.content}`);
                return ormArticle;
            });

            let i = 0;
            for (const model of toSave) {
                const toSaveModel = await model;
        
                if (!toSaveModel) {
                    continue;
                }

                await getImage(toSaveModel);
                await articleRepo.save(toSaveModel);
                i++;
            }
            console.log('Saved', i, 'new articles');
        } catch (e) {
            // YES IGNORE ERRORS PLEASE. THANK YOU.
            console.error(e);
        }

        await wait(THROTTLE);
    }
}

export async function getImage(article: Article) {
    if (!article.url || !!article.imageUrl) {
        return;
    }

    try {
        const res: { image: string } = await linkPreview(article.url);
        
        if (res && res.image) {
            article.imageUrl = res.image;
        }
    } catch (e) {
        console.error('Some bs error occurred', e);
    }
    await wait(100);
}

export async function updateExisting(con: Connection) {
    const articleRepo = await con.getRepository(Article);

    const results = await articleRepo.find();

    for (const article of results) {
        await getImage(article);
        await articleRepo.update({ id: article.id }, article);
    }
}