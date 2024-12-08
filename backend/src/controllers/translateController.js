import { fetchContentAndTranslate } from '../services/translateService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import APIs from '../config/apis.js';

export const getDigestContent = asyncHandler(async (req, res) => {
  // Convert APIs object to an array and take the first 3 entries
  const contentApis = Object.entries(APIs)
    .slice(0, 3)
    .map(([lang, url]) => ({ lang, url }));

  const content = await fetchContentAndTranslate(contentApis);

  console.log("Fetched Content Before Sending Response:", content);

  if (content.length === 0) {
    console.error("No content found after processing the APIs");
    return res.status(404).json({ message: "No content found" });
  }

  console.log("Sending response with content:", content);
  return res.json(content);
});
