const db=require('./db')
 async function GetAdminbyMail(email) {
   const Admin= await db.query(`SELECT id_Admin, Admin_email, Admin_password FROM Admin WHERE Admin_email='${email}'`)
   return  Admin
   
 }
 async function insertToken(id,token){
  const result = await db.query(`UPDATE Admin SET token='${token}' WHERE id_Admin='${id}'`)
 }
async function GetAdmin() {
 const Admin = await db.query(`SELECT id_Admin,Admin_firstname,Admin_lastname,Admin_email,Admin_password,Admin_phone,Admin_address FROM Admin`)
 return {
     Admin
 }
}
async function CreateAdmin(Admin) {
    const result = await db.query(`INSERT INTO Admin ( Admin_firstname,Admin_lastname,Admin_email,Admin_password,Admin_phone,Admin_address)VALUES 
    ('${Admin.Admin_firstname}','${Admin.Admin_lastname}','${Admin.Admin_email}','${Admin.Admin_password}','${Admin.Admin_phone}','${Admin.Admin_address}') `)
    let message = 'Recheck your values ';
      
    if (result.affectedRows) {
      message = 'a Admin was created successfully';
    }
  
    return {message };
}
async function UpdateAdmin(id ,Admin){
    const result = await db.query(`UPDATE Admin SET Admin_firstname='${Admin.Admin_firstname}',Admin_lastname='${Admin.Admin_lastname}',Admin_email='${Admin.Admin_email}',Admin_password='${Admin.Admin_password}',Admin_address='${Admin.Admin_address}' WHERE id_Admin='${id}'`)

    let message = 'Error in updating the Admin ';
      
    if (result.affectedRows) {
      message = 'Admin updated successfully';
    }
  
    return {message};
}
async function RemoveAdmin(id){
    const result = await db.query(`DELETE FROM Admin WHERE id_Admin='${id}'`)
    let message = 'Error in deleting the Admin ';
      
    if (result.affectedRows) {
      message = 'Admin deleted successfully';
    }
  
    return {message};
    
}

module.exports ={
GetAdminbyMail,
GetAdmin,
CreateAdmin,
UpdateAdmin,
RemoveAdmin,

}