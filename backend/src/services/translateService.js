import fetch from 'node-fetch';
import translate from 'google-translate-api-browser';

export const fetchContentAndTranslate = async (contentApis) => {
  const content = [];

  for await (const api of contentApis) {
    try {
      console.log(`Fetching from API: ${api.url} with language: ${api.lang}`);

      const response = await fetch(api.url);
      const responseData = await response.json();

      console.log("Raw API Response:", responseData);
      if (!responseData.news || responseData.news.length === 0) {
        console.error(`No content found in API ${api.url}`);
        continue;
      }

      const items = await Promise.all(
        responseData.news.slice(0, 5).map(async (item) => {
          try {
            console.log(`Processing item with id: ${item.id}`);

            const translated_title = await translate(item.title, { to: "en" });
            const translated_description = await translate(item.description, { to: "en" });

            const newItem = {
              source_id: item.id,
              source_language: api.lang,
              source_title: item.title,
              source_description: item.description,
              source_path: item.path,
              translated_title: translated_title.text,
              translated_description: translated_description.text,
            };

            console.log("New item:", newItem);

            return newItem;
          } catch (translationError) {
            console.error("Translation error for item with id:", item.id, translationError);
            return null;
          }
        })
      );

      const validItems = items.filter((item) => item !== null);
      content.push(...validItems);

    } catch (error) {
      console.error(`Failed to fetch data from ${api.url}:`, error.message);
    }
  }

  console.log("Final Content Array:", content);
  return content.slice(0, 35);
};
