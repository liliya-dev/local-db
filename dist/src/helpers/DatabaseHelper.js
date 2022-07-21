"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
class DatabaseHelper {
    static getUri() {
        const db = this.getDatabaseConfig();
        if (db.uri)
            return db.uri;
        const queryString = db.queryString ? `?${db.queryString}` : '';
        if (db.username && db.password) {
            console.log(`DatabaseHelper#getUri: has username and password`);
            const uri = `${db.scheme}://${db.username}:${db.password}@${db.host}:${db.port}`;
            return `${uri}/${db.name}${queryString}`;
        }
        return `${db.scheme}://${db.host}:${db.port}/${db.name}${queryString}`;
    }
    static getDatabaseConfig() {
        return config_1.default;
    }
}
exports.default = DatabaseHelper;
