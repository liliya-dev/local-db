import mongoose from 'mongoose';
import 'dotenv/config';

import config from './config';
import DatabaseHelper from './helpers/DatabaseHelper';

(async () => {

  const uri = DatabaseHelper.getUri();
  console.log(`Connecting to URI: ${uri}`);

  try {
    console.log(`Server: Mongoose connecting to the database ...`);
    const connectOptions: mongoose.ConnectOptions = {};
    const caFile = config.caFile || null;
    console.log(`Server: caFile: ${caFile}`);
    if (caFile) {
      connectOptions.tlsCAFile = caFile;
    }
    console.log(
      `Server: connectOptions: ${JSON.stringify(connectOptions, null, 2)}`
    );

    await mongoose.connect(uri, connectOptions);
    console.log(`Server: Mongoose connected`);
  } catch (e) {
    console.log(`unable to connect to database: ${uri}`);
  }
  process.exit()
})();