const db=require('./db')
const config=require('../config')

async function GetProducts() {
 const products = await db.query(`SELECT id_product,product_title,product_weight,product_price,product_quantity,product_picture_link FROM products`)
 return {
     products
 }
}
async function CreateProduct(product) {
    const result = await db.query(`INSERT INTO products (product_title,product_weight,product_price,product_quantity,product_picture_link)VALUES 
    ('${product.product_title}','${product.weight}','${product.product_price}','${product.quantity}','${product.pproduct_picture_link}') `)
    let message = 'Recheck your values ';
      
    if (result.affectedRows) {
      message = 'a product was created successfully';
    }
  
    return {message };
}
async function UpdateProduct(id ,product){
    const result = await db.query(`UPDATE products SET product_title='${product.product_title}',product_weight='${product.product_weight}',product_price='${product.product_price}',product_quantity='${product.product_quantity},product_picture_link='${product.product_picture_link}' WHERE id_product='${id}'`)

    let message = 'Error in updating the product ';
      
    if (result.affectedRows) {
      message = 'product updated successfully';
    }
  
    return {message};
}
async function RemoveProduct(id ,product){
    const result = await db.query(`DELETE FROM products WHERE id_product='${id}'`)
    let message = 'Error in deleting the product ';
      
    if (result.affectedRows) {
      message = 'product deleted successfully';
    }
  
    return {message};
    
}

module.exports ={
GetProducts,
CreateProduct,
UpdateProduct,
RemoveProduct
}