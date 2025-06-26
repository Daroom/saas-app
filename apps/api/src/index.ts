import app from './app';
import { db } from '@saas-app/database';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  let countt=await db.user.count();
  console.log(`Server is ruuuunning on port ${PORT}`);
  console.log(`User count is  ${countt}`);
});