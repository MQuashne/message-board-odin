const express = require("express");
const app = express();
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ROUTERS
const {indexRouter} = require("./routes/indexRouter.js");
const newRouter = require("./routes/newRouter.js");

//RENDERER
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

//SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Message board live on port ${PORT}!`);
});
/*
app.use((req,res,next) => {
    throw new Error("OH NO!");
});
*/
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});