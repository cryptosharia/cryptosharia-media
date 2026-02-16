import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read screening.ts content
const screeningPath = path.join(__dirname, '../src/lib/data/screening.ts');
const content = fs.readFileSync(screeningPath, 'utf-8');

// Regex to extract logo objects
// logo: { id: "logo-btc", url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", filename: "btc.png", size: 1024 },
const regex = /logo:\s*{\s*id:\s*"[^"]+",\s*url:\s*"([^"]+)",\s*filename:\s*"([^"]+)"/g;

const downloadDir = path.join(__dirname, '../static/tokens');
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

let match;
while ((match = regex.exec(content)) !== null) {
    const url = match[1];
    const filename = match[2];
    const filePath = path.join(downloadDir, filename);

    console.log(`Downloading ${filename} from ${url}...`);

    https.get(url, (res) => {
        if (res.statusCode === 200) {
            const file = fs.createWriteStream(filePath);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Saved ${filename}`);
            });
        } else {
            console.error(`Failed to download ${url}: Status ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.error(`Error downloading ${url}: ${err.message}`);
    });
}
