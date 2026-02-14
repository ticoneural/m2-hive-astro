export interface Product {
    id: number;
    sku: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    category_id: number;
    category_name: string;
    subcategory_id?: number | null;
    subcategory_name?: string | null;
    category?: string; // Fallback
    images?: string[];
    thumbnail?: string;
    cover_path?: string;
    stock_quantity?: number;
    stock_status?: string;
    condition?: string;
    transaction_type?: 'sale' | 'rent';
    property_type?: 'house' | 'apartment' | 'lot' | 'commercial';
    created_at?: string;
    updated_at?: string;
    specifications?: {
        bedrooms?: string | number;
        bathrooms?: string | number;
        size_m2?: string | number;
        size?: string | number;
        parking_spaces?: string | number;
        parking?: string | number;
        location?: string;
        pool?: string;
        view?: string;
        maintenance_fee?: string;
        amenities?: string[];
        [key: string]: any;
    };
}

export interface Category {
    name: string;
    count: number;
    subcategories?: Subcategory[];
}

export interface Subcategory {
    name: string;
    count: number;
}
