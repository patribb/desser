const express = require("express");
const env = require('./config/envConfig');
const cors = require('cors');
const connect = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();

//& connect db
connect();
app.use(cors())
//* add middleware
app.use(express.json());

const port = env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

//& user Routes
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}👽!`));
