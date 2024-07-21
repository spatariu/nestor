import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models/init';
import personRoutes from './routes/personRoutes';
import groupRoutes from './routes/groupRoutes';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/people', personRoutes); // Mount the person routes at /people
app.use('/groups', groupRoutes);  // Mount the group routes at /groups

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

   try {
    await sequelize.sync({ force: false }); // Sync models with database
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
});
