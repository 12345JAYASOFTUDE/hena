import express from 'express';
import bodyParser from 'body-parser';
import UserRouter from './routers/userrouter';
import db from './database'; // Import your database file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Ensure database is synced before starting the server
db.sequelize.sync() // You can specify { force: false } if you don't want to drop tables
  .then(() => {
    console.log('Database synchronized.');

    // Start the server
    app.use("/user", UserRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });
