import Database from 'better-sqlite3';

const db = new Database('src/lib/server/database.sqlite');

try {
    // 1. Ensure Area 'Guadalupe'
    console.log('Ensuring Area Guadalupe...');
    const area = db.prepare("SELECT * FROM areas WHERE slug = 'guadalupe'").get();
    let areaId;
    if (!area) {
        const info = db.prepare("INSERT INTO areas (slug, name, `order`) VALUES (?, ?, ?)").run('guadalupe', 'Guadalupe', 4);
        areaId = info.lastInsertRowid;
        console.log('Created Area Guadalupe ID:', areaId);
    } else {
        areaId = area.id;
        console.log('Found Area Guadalupe ID:', areaId);
    }

    // 2. Insert Listing
    const slug = 'apartamento-amueblado-ulacit-guadalupe';
    // Check if exists
    const existing = db.prepare("SELECT id FROM listings WHERE slug = ?").get(slug);
    if (existing) {
        console.log('Listing already exists, skipping insert.');
        process.exit(0);
    }

    const title = 'Apartamento Amueblado Cerca de ULACIT';
    const desc = `ALQUILO Apartamento AMUEBLADO CERCA DE LA ULACIT !! en San Francisco Guadalupe.
    
2 cuartos, 2 baños completos. Cocina sala comedor una sola área. Cuarto de pilas grande. En un segundo piso. 
Incluye internet 🛜. Un parqueo. Se acepta mascota pequeña. Mucha luz y mucho aire.

Mensualidad: ₡450.000 + Depósito de Garantía.
Contáctanos al WhatsApp 8733 2630`;

    const gallery = JSON.stringify([
        '/assets/properties/guadalupe/1.jpg',
        '/assets/properties/guadalupe/2.jpg',
        '/assets/properties/guadalupe/3.jpg',
        '/assets/properties/guadalupe/4.jpg',
        '/assets/properties/guadalupe/5.jpg'
    ]);

    const stmt = db.prepare(`
        INSERT INTO listings (
            title, slug, price, currency, status, is_featured, area_id, 
            cover_path, gallery_paths, published_at, 
            listing_type, location_text, 
            bedrooms, bathrooms, parking, description
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, 
            ?, ?, DATETIME('now'), 
            ?, ?,
            ?, ?, ?, ?
        )
    `);

    stmt.run(
        title, slug, 450000, 'CRC', 'published', 1, areaId,
        '/assets/properties/guadalupe/1.jpg', gallery,
        'rent', 'San Francisco, Guadalupe',
        2, 2, 1, desc
    );

    console.log('Listing Inserted Successfully!');

} catch (e) {
    console.error('Error inserting listing:', e);
}
