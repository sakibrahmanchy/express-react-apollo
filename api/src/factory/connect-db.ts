import resolve from './resolve-db';

export default class ActiveDB {
  static instance;

  static async createDBInstance() {
    const DB = resolve(process.env.DRIVER);

    if (!DB) {
      throw Error(`Invalid driver: ${process.env.DRIVER}`);
    }

    const db = process.env.NODE_ENV === 'test'
      ? (process.env.TEST_DATABASE || 'test-db') : (process.env.DATABASE || 'db');

    const dbInstance = new DB({
      driver: process.env.DRIVER,
      database: db,
      host: process.env.HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    });

    ActiveDB.instance = await dbInstance.connect();
  }

  static async getInstance() {
    if (!ActiveDB.instance) {
      await ActiveDB.createDBInstance();
    }

    return ActiveDB.instance;
  }

  static async getFreshInstance() {
    await ActiveDB.createDBInstance();
    return ActiveDB.instance;
  }
}
