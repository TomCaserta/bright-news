import fetch from 'node-fetch';
import { IArticlesResponse, ISourcesResponse } from './response.interface';

const NEWS_API_URL = 'https://newsapi.org/v2/';

enum ApiEndpoint {
    EVERYTHING = 'everything',
    SOURCES = 'sources',
    HEADLINES = 'top-headlines',
}

export class NewsApi {
    constructor(
        private key: string,
    ) {}

    /**
     * Searches all articles on the news API
     * service.
     * @param searchTerm Search term to use for searching articles
     */
    search(searchTerm: string): Promise<IArticlesResponse> {
        return this.request(ApiEndpoint.EVERYTHING, {
            query: searchTerm,
        });
    }

    /**
     * Gets the headlines
     */
    getAll(language: string, pageSize: number = 20): Promise<IArticlesResponse> {
        return this.request(ApiEndpoint.HEADLINES, {language, pageSize});
    }   
    /**
     * Returns a list of all sources that are currently supported
     * by the news API.
     */
    getSources(): Promise<ISourcesResponse> {
        return this.request(ApiEndpoint.SOURCES);
    }

    private request(path: ApiEndpoint, query?: Record<string, string | number>) {
        query = {
            ...query,
            apiKey: this.key,
        };
        return fetch(`${NEWS_API_URL}${path}?${
            Object.keys(query).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&')
        }`).then(res => res.json());
    }
}