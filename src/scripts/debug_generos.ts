import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env file manually
const envPath = resolve(__dirname, '../../.env');
console.log(`Reading .env from: ${envPath}`);

let supabaseUrl = '';
let supabaseKey = '';

try {
    const envConfig = readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            if (key.trim() === 'VITE_SUPABASE_URL') supabaseUrl = value;
            if (key.trim() === 'VITE_SUPABASE_ANON_KEY') supabaseKey = value;
        }
    });
} catch (e) {
    console.error('Error reading .env file:', e);
    process.exit(1);
}


if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

console.log(`Supabase URL: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
        schema: 'api'
    }
});

async function testFetchGeneros() {
    console.log('Fetching generos...');
    const { data, error } = await supabase
        .from('genero')
        .select('*');

    if (error) {
        console.error('Error fetching generos:', error);
    } else {
        console.log('Generos fetched successfully:');
        console.log(JSON.stringify(data, null, 2));
    }
}

testFetchGeneros();
