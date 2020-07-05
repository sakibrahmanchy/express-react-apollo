abstract class DB {
  driver: string;
  database: string;
  host: string;
  user: string;
  pass: string;

  constructor({ driver = 'local', database = 'db', host = '', user = '', pass = '' }) {
    this.driver = driver;
    this.database = database;
    this.host = host;
    this.user = user;
    this.pass = pass;
  }

    // Connect to database
  abstract connect();

    // Execute queries
  abstract execute?(): void;
}

export default DB;
