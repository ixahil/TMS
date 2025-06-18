import app from './app';
import config from './config/config';
import { connectDB } from './config/db';

(async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Server Connection Error ${error}`);
  }
})();
