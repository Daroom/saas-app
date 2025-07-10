import app from './app';
import { db } from '@saas-app/database';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is ruuuunning on port ${PORT}`);
});