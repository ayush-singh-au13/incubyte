const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;


//health check
app.get("/",(req,res) => {
    return res.json({status:"OK",message : "Working fine!"});
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});