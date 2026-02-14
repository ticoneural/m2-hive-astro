async function testBrain() {
    try {
        const response = await fetch('http://localhost:4000/api/brain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Hola, ¿cuáles son las mejores zonas para vivir en Escazú?" })
        });
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (e) {
        console.error("Error:", e);
    }
}
testBrain();
