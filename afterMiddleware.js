//////////////////////////
//   after middleware   //
//////////////////////////

const express = require("express");
const app = express();
const router = express.Router();

//
// middlewares
//
const middleware1 = (req, res, next) => {
    console.log("*********************************");
    next();
};

const middleware2 = async (req, res, next) => {
    await next();
    console.log("----------------------------------");
};


// controller
r.get('/am', middleware1, middleware2, (req, res) => {
    console.log("hey there...");
    return res.send("Akshay Gudhate");
});

// router
app.use('/api', router);


// register http listener
app.listen(8080, () => console.warn("Server started successfully!"));
