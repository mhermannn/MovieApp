const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on https://localhost:${port}`)
});