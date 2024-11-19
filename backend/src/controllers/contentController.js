import { fetchUnifiedContent } from '../services/contentService.js';
import { asyncHandler } from '../utils/errorHandler.js';

export const getUnifiedContent = asyncHandler(async (req, res) => {
    const data = await fetchUnifiedContent();
    res.json(data);
});