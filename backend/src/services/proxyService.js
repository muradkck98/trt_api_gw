import axios from 'axios';
import NodeCache from 'node-cache';
import APIs from '../config/apis.js';

const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 300 });

export async function fetchProxyContent(lang) {
    if (cache.has(lang)) {
        console.log(`Cache hit for ${lang}: Returning cached content.`);
        return cache.get(lang);
    }

    const url = APIs[lang];
    if (!url) {
        throw new Error(`Unsupported language: ${lang}`);
    }

    try {
        const response = await axios.get(url);
        const data = response.data;
        
        cache.set(lang, data);
        
        return data;
    } catch (error) {
        console.error(`Failed to fetch data for ${lang}: ${error.message}`);
        throw new Error(`Error fetching data for ${lang}`);
    }
}
