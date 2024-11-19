import axios from 'axios';
import NodeCache from 'node-cache';
import APIs from '../config/apis.js';


const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 300 });
const API_LIMIT = parseInt(process.env.API_LIMIT, 10) || 150;


const apiArray = Object.entries(APIs).map(([lang, url]) => ({ lang, url }));

export async function fetchUnifiedContent() {
    if (cache.has('unifiedContent')) {
        console.log('Cache hit: Returning unified content from cache.');
        return cache.get('unifiedContent');
    }

    const promises = apiArray.map(async ({ url, lang }) => {
        try {
            const response = await axios.get(url);
    
            console.log(`Full Response from ${url}:`, JSON.stringify(response.data, null, 2));
            const items = response.data.latest || [];
    
            if (items.length > 0) {
                console.log(`Items extracted from ${url}:`, JSON.stringify(items, null, 2));
            } else {
                console.log(`No items found in response from ${url}.`);
            }
    
            return items.slice(0, API_LIMIT).map((item) => ({
                id: item.id || null,
                type: item.type || null,
                title: item.title || null,
                description: item.description || null,
                road: item.road || null,
                published_date: item.publishedDate || item.published_date || null,
                authors: item.authors ? item.authors.map(author => ({
                    userName: author.userName || null,
                    firstName: author.firstName || null,
                    lastName: author.lastName || null,
                    bio: author.bio || null,
                    path: author.path || null
                })) : [],
                image: item.mainImageUrl || item.image || null,
                language: lang,
            }));
        } catch (error) {
            console.error(`Failed to fetch data from ${url}: ${error.message}`);
            console.error('Error response:', error.response ? JSON.stringify(error.response.data) : 'No response data');
            return [];
        }
    });
    
    

    // Wait for all API responses
    const results = await Promise.all(promises);

    // Flatten the results and combine all entries
    const unifiedContent = results.flat();

    // If no content is fetched, log a message
    if (unifiedContent.length === 0) {
        console.log('No data fetched from any API.');
    }

    // Cache the unified content
    cache.set('unifiedContent', unifiedContent);

    console.log('Data fetched and cached successfully.');
    return unifiedContent;
}
