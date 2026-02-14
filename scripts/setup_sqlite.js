import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../src/lib/server/database.sqlite');

const db = new Database(dbPath);

console.log('Initializing SQLite database at:', dbPath);

// 1. Create Tables
const schema = `
    DROP TABLE IF EXISTS inquiries;
    DROP TABLE IF EXISTS listings;
    DROP TABLE IF EXISTS areas;
    DROP TABLE IF EXISTS site_settings;

    CREATE TABLE site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand_name TEXT NOT NULL,
        whatsapp_number TEXT NOT NULL,
        instagram_url TEXT,
        facebook_url TEXT,
        working_hours TEXT,
        default_og_image_path TEXT DEFAULT '/assets/og-default.jpg',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE areas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        "order" INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE listings (
        id TEXT PRIMARY KEY, -- UUID strings
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        listing_type TEXT NOT NULL CHECK(listing_type IN ('sale', 'rent')), -- Added missing column
        price REAL NOT NULL,
        currency TEXT NOT NULL CHECK(currency IN ('USD', 'CRC')),
        status TEXT NOT NULL CHECK(status IN ('draft', 'published', 'hidden')),
        is_featured INTEGER DEFAULT 0, -- boolean as 0/1
        area_id INTEGER REFERENCES areas(id),
        location_text TEXT, -- Added missing column for specific address/text
        cover_path TEXT,
        gallery_paths TEXT DEFAULT '[]', -- JSON string
        youtube_url TEXT,
        lat REAL,
        lng REAL,
        published_at DATETIME,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NOT NULL,
        intent TEXT,
        listing_id TEXT REFERENCES listings(id),
        page_path TEXT,
        ip_hash TEXT,
        user_agent TEXT
    );
`;

db.exec(schema);
console.log('Tables created.');

// 2. Seed Data

// Site Settings
db.prepare(`
    INSERT INTO site_settings (brand_name, whatsapp_number, working_hours)
    VALUES (?, ?, ?)
`).run('M2 Real Estate', '87332630', 'Lunes a Viernes 8am - 5pm'); // Updated phone

// Areas
const insertArea = db.prepare('INSERT INTO areas (slug, name, "order") VALUES (?, ?, ?)');
insertArea.run('escazu', 'Escazú', 1);
insertArea.run('santa-ana', 'Santa Ana', 2);
insertArea.run('rohrmoser', 'Rohrmoser', 3);

const escazuId = db.prepare("SELECT id FROM areas WHERE slug = 'escazu'").get().id;

// Listings
const insertListing = db.prepare(`
    INSERT INTO listings (
        id, slug, title, listing_type, price, currency, status, is_featured, 
        area_id, location_text, cover_path, gallery_paths, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Listing 1
insertListing.run(
    'uuid-1',
    'residencia-lujo-escazu',
    'Residencia de Lujo en Escazú',
    'sale',
    1250000,
    'USD',
    'published',
    1,
    escazuId,
    'San Rafael de Escazú, Condominio Privado',
    '/assets/demo/modern_home.png',
    JSON.stringify([{ url: '/assets/demo/modern_home.png' }]),
    new Date().toISOString()
);

// Listing 2
insertListing.run(
    'uuid-2',
    'hacienda-colonial-escazu',
    'Hacienda Colonial Premium',
    'sale',
    850000,
    'USD',
    'published',
    1,
    escazuId,
    'Escazú Centro, cercanías Costa Rica Country Club',
    '/assets/demo/colonial.png',
    JSON.stringify([{ url: '/assets/demo/colonial.png' }]),
    new Date().toISOString()
);

// Listing 3
insertListing.run(
    'uuid-3',
    'penthouse-vista-valle',
    'Penthouse Vista Valle',
    'rent',
    4500, // Monthly rent
    'USD',
    'published',
    1,
    escazuId,
    'Jaboncillos, Torre Panorámica',
    '/assets/demo/apartment.png',
    JSON.stringify([{ url: '/assets/demo/apartment.png' }]),
    new Date().toISOString()
);

console.log('Seed data inserted.');
console.log('Database setup complete.');
