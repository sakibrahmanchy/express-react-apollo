import fs from 'fs';
import { promisify } from 'util';
import DB from './db';

const dir = '../db';

const openFileAsync = promisify(fs.open);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const removeFileAsync = promisify(fs.unlink);

export default // @ts-ignore
class Local extends DB {
  filename = 'db';

  constructor(configs) {
    super(configs);

    const { database = 'db' } = configs;
    this.filename = `${dir}/${database}`;
  }

  async connect(): Promise<DB> {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    try {
      await openFileAsync(this.filename, 'r');
    } catch (err) {
      await this.write([]);
    }

    // Successfully connected
    return this;
  }

  async getAll(): Promise<any> {
    return this.read();
  }

  async getById(targetId): Promise<any> {
    const data = await this.read();
    return data.find(({ id }) => (id === targetId));
  }

  async add(data): Promise<any> {
    const previousData = await this.getAll();
    const newData = [data, ...previousData];
    await this.write(newData);
    return data;
  }

  async reset() {
    return this.write([]);
  }

  async write(data: any) {
    try {
      await writeFileAsync(this.filename, JSON.stringify(data));
    } catch (err) {
      throw err;
    }
    return data;
  }

  async read(): Promise<any> {
    try {
      const data = await readFileAsync(this.filename, { encoding: 'utf-8' });
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }

  async remove() {
    try {
      await removeFileAsync(this.filename);
    } catch (e) {
      throw e;
    }
  }
}
