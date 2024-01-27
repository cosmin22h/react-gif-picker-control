import axios, { AxiosInstance } from "axios";

import { Category } from "../models/Category";
import { Gif } from "../models/Gif";

const baseUrl = "https://g.tenor.com/v1";

interface ITenorService {
    getCategories(): Promise<Category[]>;
    getTrendingSearchTerms(): Promise<string[]>;
    getSearchSuggestion(term: string): Promise<string[]>;
    search(term: string, limit: number): Promise<Gif[]>;
}

export class TenorService implements ITenorService {
    private axiosTenor: AxiosInstance;

    constructor(tenorApiKey: string) {
        this.axiosTenor = axios.create({
            baseURL: `${baseUrl}`,
        });
        this.axiosTenor.interceptors.request.use((request) => {
            const params = { ...request.params, key: tenorApiKey };

            request.params = params;

            return request;
        });
    }

    public getCategories(): Promise<Category[]> {
        return this.axiosTenor
            .get("/categories")
            .then((response) =>
                response.data.tags.map(
                    (tag: { name: string; image: string }) =>
                        new Category(tag.name.slice(1), tag.image)
                )
            );
    }

    public getTrendingSearchTerms(): Promise<string[]> {
        return this.axiosTenor.get("/trending_terms");
    }

    public getSearchSuggestion(term: string): Promise<string[]> {
        return this.axiosTenor.get(`/search_suggestions`, {
            params: {
                q: term,
            },
        });
    }

    public search(term: string, limit: number = 50): Promise<Gif[]> {
        return this.axiosTenor.get("/search", {
            params: {
                q: term,
                limit: limit,
            },
        });
    }
}
