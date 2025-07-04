// Test para simular la descarga del frontend con fetch
const fetch = require('node-fetch');

async function testCoverLetterDownload() {
    try {
        console.log("🧪 Probando descarga de cover letter...");
        
        const response = await fetch('http://localhost:3000/offers/cover-letter/68176351f05b008452a0ae56/685145288af4b068aa621640', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:5174"
            },
        });
        
        if (!response.ok) {
            throw new Error("Error downloading PDF");
        }
        
        console.log("📋 Headers de respuesta:");
        for (const [key, value] of response.headers.entries()) {
            console.log(`  ${key}: ${value}`);
        }
        
        const disposition = response.headers.get("Content-Disposition");
        console.log("\n🔍 Content-Disposition header:", disposition);
        
        let filename = "cover-letter.pdf";
        
        if (disposition && disposition.includes("filename=")) {
            const filenameMatch = disposition.match(/filename="([^"]+)"/);
            const filenameStarMatch = disposition.match(/filename=([^;]+)/);
            
            console.log("filenameMatch:", filenameMatch);
            console.log("filenameStarMatch:", filenameStarMatch);
            
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
                console.log("✅ Filename extraído (con comillas):", filename);
            } else if (filenameStarMatch && filenameStarMatch[1]) {
                filename = filenameStarMatch[1].replace(/"/g, "");
                console.log("✅ Filename extraído (sin comillas):", filename);
            }
        } else {
            console.log("❌ No se encontró Content-Disposition o filename en el header");
        }
        
        console.log("📁 Filename final para descarga:", filename);
        
        // Obtener el contenido y guardarlo
        const buffer = await response.buffer();
        console.log(`📄 PDF descargado: ${buffer.length} bytes`);
        
        // Simular la escritura del archivo
        const fs = require('fs');
        fs.writeFileSync(`test-${filename}`, buffer);
        console.log(`✅ Archivo guardado como: test-${filename}`);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testCoverLetterDownload();
