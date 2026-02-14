import type { Product, Category } from "../types";

const API_BASE = "https://api-m2.agenticantnest.com/api/v1";
const CACHE_TTL = 60 * 1000; // 60 seconds

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

const globalCache = globalThis as any;

if (!globalCache.__api_cache) {
    globalCache.__api_cache = {
        products: null,
        categories: null,
    };
}

const cache = globalCache.__api_cache;

export async function getProducts(): Promise<Product[]> {
    const now = Date.now();
    if (cache.products && (now - cache.products.timestamp < CACHE_TTL)) {
        return cache.products.data;
    }

    try {
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        const json = await response.json();
        const data = json.data || [];

        cache.products = {
            data,
            timestamp: now
        };

        return data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        // Return stale data if available, otherwise empty
        return cache.products?.data || [];
    }
}

export async function getCategories(): Promise<Category[]> {
    const now = Date.now();
    if (cache.categories && (now - cache.categories.timestamp < CACHE_TTL)) {
        return cache.categories.data;
    }

    try {
        const response = await fetch(`${API_BASE}/categories`);
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        const json = await response.json();
        // Since the API returns the array directly or in a wrapper, let's assume direct array based on previous code
        // Previous code: let rawCategories: Category[] = catData || [];
        // So catData was valid. Let's return json directly if array, or json.data.
        const data = Array.isArray(json) ? json : (json.data || []);

        cache.categories = {
            data,
            timestamp: now
        };

        return data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return cache.categories?.data || [];
    }
}
