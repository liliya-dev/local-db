"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = {
    scheme: process.env.DB_SCHEME || 'mongodb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'pool',
    uri: process.env.DB_URI || '',
};
if (process.env.DB_USERNAME) {
    db.username = process.env.DB_USERNAME;
}
if (process.env.DB_PASSWORD) {
    db.password = process.env.DB_PASSWORD;
}
if (process.env.DB_QUERY_STRING) {
    db.queryString = process.env.DB_QUERY_STRING;
}
if (process.env.DB_CA_FILE) {
    db.caFile = process.env.DB_CA_FILE;
}
exports.default = db;
