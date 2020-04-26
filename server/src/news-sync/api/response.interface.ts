import { ISource } from "./source.interface";
import { IArticle } from "./article.interface";

export interface IBaseResponse {
    status: string;
    totalResults: number;
}

export interface ISourcesResponse extends IBaseResponse {
    sources: ISource[];
}

export interface IArticlesResponse extends IBaseResponse {
    articles: IArticle[];
}
