const db=require('./db')
async function GetCategories() {
 const categories = await db.query(`SELECT id_category,category_title,category_description,picture_category_link FROM categories`)
 return {
     categories
 }
}
async function CreateCategory(category) {
    const result = await db.query(`INSERT INTO categories (category_title,category_description,picture_category_link)VALUES 
    ('${category.category_title}','${category.category_description}','${category.picture_category_link}') `)
    let message = 'Recheck your values ';
      
    if (result.affectedRows) {
      message = 'a category was created successfully';
    }
  
    return {message };
}
async function UpdateCategory(id ,category){
    const result = await db.query(`UPDATE categories SET category_title='${category.category_title}',category_description='${category.category_description}',category_picture_link='${category.picture_category_link}' WHERE id_category='${id}'`)

    let message = 'Error in updating the category ';
      
    if (result.affectedRows) {
      message = 'category updated successfully';
    }
  
    return {message};
}
async function RemoveCategory(id){
    const result = await db.query(`DELETE FROM categories WHERE id_category='${id}'`)
    let message = 'Error in deleting the category ';
      
    if (result.affectedRows) {
      message = 'category deleted successfully';
    }
  
    return {message};
    
}

module.exports ={
GetCategories,
CreateCategory,
UpdateCategory,
RemoveCategory
}