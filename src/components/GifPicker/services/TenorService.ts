import { Category } from "../models/Category";
import { Gif } from "../models/Gif";

const baseUrl = "https://tenor.googleapis.com/v2";

interface ITenorService {
    getCategories(): Promise<Category[]>;
    getTrendingSearchTerms(): Promise<string[]>;
    getSearchSuggestion(term: string): Promise<string[]>;
    search(term: string, limit: number): Promise<Gif[]>;
}

export class TenorService implements ITenorService {
    private tenorApiKey: string;

    constructor(tenorApiKey: string) {
        this.tenorApiKey = tenorApiKey;
    }

    public getCategories(): Promise<Category[]> {
        return fetch(`${baseUrl}/categories?key=${this.tenorApiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `[${response.status}]  ${response.statusText}`
                    );
                }

                return response.json();
            })
            .then((data) =>
                data.tags.map(
                    (tag) => new Category(tag.name.slice(1), tag.image)
                )
            );
    }

    public getTrendingSearchTerms(): Promise<string[]> {
        return fetch(`${baseUrl}/trending_terms?key=${this.tenorApiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `[${response.status}]  ${response.statusText}`
                    );
                }

                return response.json();
            })
            .then((data) => data.results);
    }

    public getSearchSuggestion(term: string): Promise<string[]> {
        return fetch(
            `${baseUrl}/search_suggestions?q=${term}&key=${this.tenorApiKey}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `[${response.status}]  ${response.statusText}`
                    );
                }

                return response.json();
            })
            .then((data) => data.results);
    }

    public search(term: string, limit: number = 50): Promise<Gif[]> {
        return fetch(
            `${baseUrl}/search?q=${term}&limit=${limit}&key=${this.tenorApiKey}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `[${response.status}]  ${response.statusText}`
                    );
                }

                return response.json();
            })
            .then((data) =>
                data.results.map((gif) => {
                    const gifMedia = gif.media_formats["gif"];

                    return new Gif(
                        gif.id,
                        gif.content_description,
                        gifMedia.preview,
                        gifMedia.url,
                        gifMedia.dims[0],
                        gifMedia.dims[1],
                        gif.created
                    );
                })
            );
    }
}
