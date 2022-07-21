"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
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
        await mongoose_1.default.connect(uri, connectOptions);
        console.log(`Server: Mongoose connected`);
    }
    catch (e) {
        console.log(`unable to connect to database: ${uri}`);
    }
})();
