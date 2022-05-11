const express = require("express");
const usersRouter = require('./routes/users')
const productRouter=require('./routes/products')
const droneRouter=require('./routes/drones')
const categoryRouter=require('./routes/categories')

const app = express();

const port = 5000;

app.use(express.json());

app.use(
  function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  }
);



app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/drones", droneRouter);
app.use("/categories", categoryRouter);


app.listen(port, () => {
  console.log(`soraeir app is listening at http://localhost:${port}`);
});