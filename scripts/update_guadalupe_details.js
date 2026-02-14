import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../src/lib/server/database.sqlite');
const db = new Database(dbPath);

console.log('--- UPDATING GUADALUPE LISTING ---');

// Parsed data from user text:
// "ALQUILO Apartamento AMUEBLADO CERCA DE LA ULACIT !! en San Francisco Guadalupe. 
// 2 cuartos, 2 baños completos. Cocina sala comedor una sola área. Cuarto de pilas grande. 
// En un segundo piso. Incluye internet 🛜 . Un parqueo. Se acepta mascota pequeña. 
// Mucha luz y mucho aire. Mensualidad: ₡450.000 + Depósito de Garantía."

const newData = {
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    size: 0, // Not verified in text, keeping as is or 0
    price: 450000,
    currency: 'CRC',
    description: `Apartamento amueblado ubicado en San Francisco de Guadalupe, estratégicamente cerca de la ULACIT.

Este luminoso apartamento en segundo piso ofrece un diseño integrado de cocina, sala y comedor en una sola área, maximizando el espacio y la ventilación natural.

**Características Principales:**
• 2 Habitaciones confortables
• 2 Baños completos
• 1 Espacio de estacionamiento
• Cuarto de pilas amplio
• Internet incluido 🛜

**Política de Mascotas:** Se acepta mascota pequeña.

**Condiciones:** Mensualidad ₡450.000 + Depósito de Garantía.`
};

try {
    const stmt = db.prepare(`
        UPDATE listings 
        SET bedrooms = ?, bathrooms = ?, parking = ?, price = ?, currency = ?, description = ?
        WHERE slug = 'apartamento-amueblado-ulacit-guadalupe'
    `);

    const info = stmt.run(
        newData.bedrooms,
        newData.bathrooms,
        newData.parking,
        newData.price,
        newData.currency,
        newData.description
    );

    console.log(`Changes made: ${info.changes}`);

    if (info.changes > 0) {
        console.log('✅ Updated "Guadalupe" listing successfully with structured data.');
    } else {
        console.log('⚠️ Warning: Listing not found. Checking slugs...');
        const slugs = db.prepare('SELECT slug FROM listings').all();
        console.log('Available slugs:', slugs);
    }

} catch (e) {
    console.error('Error updating listing:', e);
}
