import express from 'express';
import cors from 'cors';
import contentRoutes from './routes/contentRoutes.js';
import proxyRoutes from './routes/proxyRoute.js';
import translateRoutes from './routes/translateRoutes.js';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/content', contentRoutes);
app.use('/api/proxy', proxyRoutes);
app.use('/api/translate', translateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
