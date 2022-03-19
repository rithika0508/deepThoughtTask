const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const ConnectDB = require("./config/db");

const app = express();
app.use(express.json())

const booksRoutes = require("./routes/books");
const adminRoute = require("./routes/admin");
app.use("/books", booksRoutes)
app.use("/admin", adminRoute)

ConnectDB();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`server is on port ${PORT}`)
})
process.on("unhandledRejection",(err , promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})