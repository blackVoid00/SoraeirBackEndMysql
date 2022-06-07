require("dotenv").config();
const express = require("express");
const usersRouter = require('./routes/users')
const productRouter=require('./routes/products')
const droneRouter=require('./routes/drones')
const categoryRouter=require('./routes/categories')
const adminRouter=require('./routes/UserAdmin')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Admin= require("./services/admin");

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
app.post("/register",async (req, res) => {
 
  try {
 
    const { Admin_firstname, Admin_lastname, Admin_email, Admin_password ,Admin_phone,Admin_address} = req.body;

   
    if (!(Admin_email && Admin_password && Admin_firstname && Admin_lastname && Admin_phone && Admin_address)) {
      res.status(400).send("All input is required");
    }

  
    
    // const oldUser = await Admin.GetAdminbyMail(Admin_email);
  
    //   if (oldUser) {
    //     return res.status(409).send("User Already Exist. Please Login");
    //   }
   const salt = await bcrypt.genSalt(10);
   const encryptedPassword = await bcrypt.hash(Admin_password, salt);

 
    const admin = await Admin.CreateAdmin({
      Admin_firstname,
      Admin_lastname,
      Admin_email: Admin_email.toLowerCase(), 
      Admin_password: encryptedPassword,
      Admin_phone,
      Admin_address
    });

   
    const token = jwt.sign(
      { id_admin: admin.id_Admin, Admin_email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "8h",
      }
    );
 
    admin.token = token;

   
    res.status(201).json(admin);
  } catch (err) {
    console.log(err);
  }
});


app.post("/login", async (req, res) => {
  try {
   
     const {Admin_email,Admin_password} = req.body;
  
    
      if (!(Admin_email && Admin_password)) {
        res.status(400).send("All input is required");
      }
 
      const admin = await Admin.GetAdminbyMail(Admin_email);
     //console.log(admin);
     //console.log(admin[0].Admin_password)
      if (admin && (await bcrypt.compare( Admin_password ,admin[0].Admin_password))) {
       
        const token = jwt.sign(
          { id_admin: admin.id_Admin, Admin_email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "8h",
          }
        );
     
        admin.token = token;
        //console.log(token)
        //console.log(admin.token)
        res.status(201).json(token);
      }
      //res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
});
const auth = require("./middleware/auth");

app.use("/users",auth, usersRouter);
app.use("/products",auth, productRouter);
app.use("/drones",auth, droneRouter);
app.use("/categories",auth, categoryRouter);
app.use("/admin",auth, adminRouter);

app.listen(port, () => {
  console.log(`soraeir app is listening at http://localhost:${port}`);
});