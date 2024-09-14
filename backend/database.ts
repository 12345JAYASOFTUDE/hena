import { Sequelize } from 'sequelize';
import initUserModel from './models/usermodel';
import initArtworkModel from './models/artworkmodel';



// Define the interface for the db object with only User model
interface Db {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  User: typeof import('./models/usermodel').User; 
  Artwork:typeof import('./models/artworkmodel').Artwork;// Correct type
}

// Initialize Sequelize instance
const sequelize = new Sequelize("vagas_database", "root", "root", {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err: Error) => {
    console.error("Database connection error:", err);
  });

// Initialize the User model
const User = initUserModel(sequelize);
const Artwork = initArtworkModel(sequelize);

const db: Db = {
  Sequelize,
  sequelize,
  User,
  Artwork,
};

// Sync the database (optionally set `force: true` to drop tables and recreate them)
sequelize.sync({  })
  .then(() => {
    console.log('Database re-synced.');
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });

export default db;
