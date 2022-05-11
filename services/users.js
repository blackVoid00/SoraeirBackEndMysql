const db = require('./db');
const config = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 5;

  async function GetUsers(){
    const users = await db.query(
        `SELECT id_customer, first_name, last_name,email,password,phonenumbber,age,address
        FROM customers `
    );
    
    return {
    users
    }
    }
  async function CreateUser(user){
          const password = user.password;    
          const encryptedassword = await bcrypt.hash(password, saltRounds);
          const result = await db.query(
          `INSERT INTO customers
          (first_name,last_name,email,password,phonenumbber,age,address) 
          VALUES 
          ('${user.first_name}','${user.last_name}','${user.email}','${encryptedassword}','${user.phonenumbber}','${user.age}','${user.address}')`
        );
      
        let message = 'Recheck your values ';
      
        if (result.affectedRows) {
          message = 'a user was created successfully';
        }
      
        return {message};
      }
      async function UpdateUser(id, customer){
        const result = await db.query(
          `UPDATE customers
          SET first_name="${customer.first_name}", last_name="${customer.last_name}", email="${customer.email}", 
          password="${customer.password}", phonenumbber="${customer.phonenumbber}" ,age="${customer.age}" ,address="${customer.address}" 
          WHERE id_customer="${id}"` 
        );
      
        let message = 'Error in updating the user information';
      
        if (result.affectedRows) {
          message = 'user updated successfully';
        }
      
        return {message};
      }

      async function RemoveUser(id){
        const result = await db.query(
          `DELETE FROM customers WHERE id_customer=${id}`
        );
      
        let message = 'Error in deleting the user';
      
        if (result.affectedRows) {
          message = 'user deleted successfully';
        }
      
        return {message};
      }
module.exports = {
  GetUsers,
  CreateUser,
  UpdateUser,
  RemoveUser
}