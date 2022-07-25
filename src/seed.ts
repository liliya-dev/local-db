import mongoose from 'mongoose';
import fs from 'fs-extra';
import path from 'path';
import mkdirp from 'mkdirp';
import 'dotenv/config';
import { IUnion, IDataset } from '../types';
import Union from './models/Union';
import Dataset from './models/Dataset';
import Attachment from './models/Attachment';
import Unions from './data/Unions';

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

    const db = await mongoose.connect(uri, connectOptions);
    console.log(`Server: Mongoose connecsssted`);

    const savedUnions: IUnion[] = [];
    const savedDatasets: IDataset[] = [];

    for (const union of Unions) {
      const unionData = JSON.parse(JSON.stringify(union));
      const { datasets } = unionData;
      delete unionData.datasets;

      const unsavedUnion = new Union(unionData);
      const savedUnion = await unsavedUnion.save();

      console.log(
        `DataController#create: datasets: ${JSON.stringify(
          datasets ? datasets.length : 0
        )}`
      );
      console.log(
        `DataController#create: datasets: ${JSON.stringify(datasets, null, 2)}`
      );
      for (const dataset of datasets) {
        const unsavedDataset = new Dataset(dataset);
        unsavedDataset.union = savedUnion;

        const savedDataset = await unsavedDataset.save();
        const sample = new Attachment({
          originalname: 'user-sample-data.csv',
          encoding: '7bit',
          mimetype: 'text/csv',
          destination: 'uploads/',
          filename: '18dd266909dd386ea67539d99df1dc18',
          filepath: `uploads/${savedDataset.id}/user-sample-data.csv`,
          path: 'uploads/18dd266909dd386ea67539d99df1dc18',
          size: 13264,
        });
        savedDataset.samples = [sample];
        const metadata = new Attachment({
          originalname: 'user-metadata.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          destination: 'uploads/',
          filename: '18dd266909dd386ea67539d99df1dc18',
          filepath: `uploads/${savedDataset.id}/user-metadata.pdf`,
          path: 'uploads/18dd266909dd386ea67539d99df1dc18',
          size: 13264,
        });
        savedDataset.metadata = [metadata];
        const data = new Attachment({
          originalname: 'user-data.csv',
          encoding: '7bit',
          mimetype: 'text/csv',
          destination: 'uploads/',
          filename: '18dd266909dd386ea67539d99df1dc18',
          filepath: `uploads/${savedDataset.id}/user-data.csv`,
          path: 'uploads/18dd266909dd386ea67539d99df1dc18',
          size: 13264,
        });
        savedDataset.data = [data];
        const saveDatasetWithFiles = await savedDataset.save();
        savedDatasets.push(saveDatasetWithFiles);
      }

      savedUnions.push(savedUnion);

      const parentPath = '../../';

      const files = [
        'user-sample-data.csv',
        'user-metadata.pdf',
        'user-data.csv',
      ];
      for (const file of files) {
        const filepath = path.join(__dirname, `../../static/${file}`);
        const exists = await fs.pathExists(filepath);
        console.log(
          `DataController#create: filepath: ${filepath} exists: ${exists}`
        );
      }

      for (const dataset of savedDatasets) {
        const { id } = dataset;
        if (id) {
          await mkdirp(`uploads/${id}`);
          for (const filename of [
            'user-sample-data.csv',
            'user-metadata.pdf',
            'user-data.csv',
          ]) {
            const sourceFilepath = path.join(
              __dirname,
              `/static/${filename}`
            );
            const targetFilepath = path.join(
              __dirname,
              parentPath,
              `/uploads/${id}/${filename}`
              );
            const sourceExists = await fs.pathExists(sourceFilepath);
            if (sourceExists) {
              await fs.copy(sourceFilepath, targetFilepath);
            }
            const targetExists = await fs.pathExists(targetFilepath);
            console.log(
              `DataController#create: filepath: ${targetFilepath} exists: ${targetExists}`
            );
          }
        }
      }
    }
    
  } catch (e) {
    console.log(`unable to connect to database: ${uri}`);
  }
  process.exit()
})();