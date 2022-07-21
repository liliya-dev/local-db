import { DatabaseConfig } from '../../types';

import config from '../config';

class DatabaseHelper {
  static getUri(): string {
    const db = this.getDatabaseConfig();

    if (db.uri) return db.uri;

    const queryString = db.queryString ? `?${db.queryString}` : '';

    if (db.username && db.password) {
      console.log(`DatabaseHelper#getUri: has username and password`);
      const uri = `${db.scheme}://${db.username}:${db.password}@${db.host}:${db.port}`;
      return `${uri}/${db.name}${queryString}`;
    }
    return `${db.scheme}://${db.host}:${db.port}/${db.name}${queryString}`;
  }

  static getDatabaseConfig(): DatabaseConfig {
    return config;
  }
}

export default DatabaseHelper;
