import app from './app.js';
import { db } from '@saas-app/database';

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Server is ruuuunning on port ${PORT}`);
});