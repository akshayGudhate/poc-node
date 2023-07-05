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
    req.time = new Date();
    console.log("*********************************");
    next();
};

const middleware2 = async (req, res, next) => {
    await next();
    const requestExecutionTime = (new Date() - req.time);
    console.log({ requestExecutionTime });
    console.log("----------------------------------");
};


// controller
router.get('/am', middleware1, middleware2, (req, res) => {
    console.log("hey there...");
    return res.send("Akshay Gudhate");
});

// router
app.use('/api', router);


// register http listener
app.listen(8080, () => console.warn("Server started successfully!"));
