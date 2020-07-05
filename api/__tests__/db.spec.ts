import fs from 'fs';
import Path from 'path';
import ActiveDB from '../src/factory/connect-db';
import Local from '../src/factory/local';

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

describe('Test Database', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('Connection', () => {
    const OLD_ENV = process.env;
    // afterEach(() => {
    //   delete process.env.DRIVER;
    //   delete process.env.TEST_DATABASE;
    // });

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });

    it('Should throw error on wrong driver', async () => {
      process.env.DRIVER = 'undandled_driver';

      try {
        await ActiveDB.getFreshInstance();
      } catch (e) {
        expect(e.message).toBe(`Invalid driver: ${process.env.DRIVER}`);
      }
    });

    it('Should have default values when no env is provided', async () => {
      process.env.DRIVER = 'local';
      process.env.NODE_ENV = 'develop';

      const {
        host, database, user, pass,
      } = await ActiveDB.getFreshInstance();
      expect(host).toBe('');
      expect(database).toBe('db');
      expect(user).toBe('');
      expect(pass).toBe('');
    });

    it('Default database should be `test-db` on test environment', async () => {
      process.env.DRIVER = 'local';
      // Not providing any database env for test
      const { database } = await ActiveDB.getFreshInstance();
      expect(database).toBe('test-db');
    });

    it('Database should match on test environment if env is provided', async () => {
      process.env.DRIVER = 'local';
      process.env.DATABASE = 'other-db';
      process.env.NODE_ENV = 'develop';

      const { database } = await ActiveDB.getFreshInstance();
      expect(database).toBe(process.env.DATABASE);
    });

    it('Test database should match on test environment if env is provided', async () => {
      process.env.DRIVER = 'local';
      process.env.TEST_DATABASE = 'other-test-db';

      const { database } = await ActiveDB.getFreshInstance();
      expect(database).toBe(process.env.TEST_DATABASE);
    });
  });
  describe('Local Database', () => {
    it('Should have default values when database is connected', async () => {
      process.env.DRIVER = 'local';
      process.env.NODE_ENV = 'develop';

      const {
        host, database, user, pass,
      } = new Local({});
      expect(host).toBe('');
      expect(database).toBe('db');
      expect(user).toBe('');
      expect(pass).toBe('');
    });

    it('should create a directory named db on connection when the directory is not available', async () => {
      const path = '../db';
      deleteFolderRecursive(path);

      const local = new Local({});
      local.connect();

      const folderExists = fs.existsSync(path);
      expect(folderExists).toBe(true);
    });

    it('should throw error when trying to write to a unknown db', async () => {
      const local = new Local({ database: 'unknown-db' });
      await local.connect();
      const path = '../db';
      deleteFolderRecursive(path);
      try {
        await local.write(['']);
      } catch (e) {
        expect(e.message).toEqual('ENOENT: no such file or directory, open \'../db/unknown-db\'');
      }
    });

    it('should throw error when trying to read from a unknown db', async () => {
      const local = new Local({ database: 'unknown-db' });
      await local.connect();
      const path = '../db';
      deleteFolderRecursive(path);
      try {
        await local.read();
      } catch (e) {
        expect(e.message).toEqual('ENOENT: no such file or directory, open \'../db/unknown-db\'');
      }
    });

    it('should throw error when trying to remove an unknown db', async () => {
      const local = new Local({ database: 'unknown-db' });
      await local.connect();
      const path = '../db';
      deleteFolderRecursive(path);
      try {
        await local.remove();
      } catch (e) {
        expect(e.message).toEqual('ENOENT: no such file or directory, unlink \'../db/unknown-db\'');
      }
    });

    it('should return find data by id if there is data with that id', async () => {
      const local = new Local({ database: 'unknown-db' });
      await local.connect();
      await local.add({ content: 'Some content with id', id: 1 });
      const data = await local.getById(1);
      expect(data.content).toEqual('Some content with id');
      expect(data.id).toEqual(1);

      const alldata = await local.getAll();
      expect(alldata.length).toEqual(1);
    });
  });
});
