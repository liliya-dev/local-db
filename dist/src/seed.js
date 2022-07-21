"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const mkdirp_1 = __importDefault(require("mkdirp"));
require("dotenv/config");
const Union_1 = __importDefault(require("./models/Union"));
const Dataset_1 = __importDefault(require("./models/Dataset"));
const Attachment_1 = __importDefault(require("./models/Attachment"));
const Unions_1 = __importDefault(require("./data/Unions"));
const config_1 = __importDefault(require("./config"));
const DatabaseHelper_1 = __importDefault(require("./helpers/DatabaseHelper"));
(async () => {
    const uri = DatabaseHelper_1.default.getUri();
    console.log(`Connecting to URI: ${uri}`);
    try {
        console.log(`Server: Mongoose connecting to the database ...`);
        const connectOptions = {};
        const caFile = config_1.default.caFile || null;
        console.log(`Server: caFile: ${caFile}`);
        if (caFile) {
            connectOptions.tlsCAFile = caFile;
        }
        console.log(`Server: connectOptions: ${JSON.stringify(connectOptions, null, 2)}`);
        const db = await mongoose_1.default.connect(uri, connectOptions);
        console.log(`Server: Mongoose connecsssted`);
        const savedUnions = [];
        const savedDatasets = [];
        for (const union of Unions_1.default) {
            const unionData = JSON.parse(JSON.stringify(union));
            const { datasets } = unionData;
            delete unionData.datasets;
            const unsavedUnion = new Union_1.default(unionData);
            const savedUnion = await unsavedUnion.save();
            console.log(`DataController#create: datasets: ${JSON.stringify(datasets ? datasets.length : 0)}`);
            console.log(`DataController#create: datasets: ${JSON.stringify(datasets, null, 2)}`);
            for (const dataset of datasets) {
                const unsavedDataset = new Dataset_1.default(dataset);
                unsavedDataset.union = savedUnion;
                const savedDataset = await unsavedDataset.save();
                const sample = new Attachment_1.default({
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
                const metadata = new Attachment_1.default({
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
                const data = new Attachment_1.default({
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
                const filepath = path_1.default.join(__dirname, `../../static/${file}`);
                const exists = await fs_extra_1.default.pathExists(filepath);
                console.log(`DataController#create: filepath: ${filepath} exists: ${exists}`);
            }
            for (const dataset of savedDatasets) {
                const { id } = dataset;
                if (id) {
                    await (0, mkdirp_1.default)(`uploads/${id}`);
                    for (const filename of [
                        'user-sample-data.csv',
                        'user-metadata.pdf',
                        'user-data.csv',
                    ]) {
                        const sourceFilepath = path_1.default.join(__dirname, `../../static/${filename}`);
                        const targetFilepath = path_1.default.join(__dirname, parentPath, `/uploads/${id}/${filename}`);
                        const sourceExists = await fs_extra_1.default.pathExists(sourceFilepath);
                        if (sourceExists) {
                            await fs_extra_1.default.copy(sourceFilepath, targetFilepath);
                        }
                        const targetExists = await fs_extra_1.default.pathExists(targetFilepath);
                        console.log(`DataController#create: filepath: ${targetFilepath} exists: ${targetExists}`);
                    }
                }
            }
        }
    }
    catch (e) {
        console.log(`unable to connect to database: ${uri}`);
    }
})();
