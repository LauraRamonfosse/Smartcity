const cors = require('cors');
const Router = require('./route');
const express = require('express');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(Router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
