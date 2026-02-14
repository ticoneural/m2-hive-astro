export interface Product {
    sku: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    images: string[];
    cover_path?: string;
    specifications?: {
        bedrooms?: number;
        bathrooms?: number;
        size_m2?: number;
        parking?: number;
        [key: string]: any;
    };
    is_featured?: boolean;
    slug?: string;
}
