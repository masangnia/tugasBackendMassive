const express = require('express');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notesRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/notes', notesRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
