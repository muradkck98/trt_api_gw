import { fetchProxyContent } from '../services/proxyService.js';
import { asyncHandler } from '../utils/errorHandler.js';

export const handleProxyRequest = asyncHandler(async (req, res) => {
    const lang = req.params.lang;
    const data = await fetchProxyContent(lang);
    res.json(data);
});
