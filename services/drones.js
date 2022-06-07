const db=require('./db')
async function GetDrones() {
 const drones = await db.query(`SELECT id_drone ,drone_ref,drone_type,drone_state,picture_drone_link FROM drones`)
 return {
     drones
 }
}
async function Createdrone(drone) {
    const result = await db.query(`INSERT INTO drones (drone_ref,drone_state,drone_type,picture_drone_link)VALUES 
    ('${drone.drone_ref}','${drone.state}','${drone.drone_type}','${drone.picture_drone_link}') `)
    let message = 'Recheck your values ';
      
    if (result.affectedRows) {
      message = 'a drone was created successfully';
    }
  
    return {message };
}
async function Updatedrone(id ,drone){
    const result = await db.query(`UPDATE drones SET drone_ref='${drone.drone_ref}',drone_state='${drone.drone_state}',drone_type='${drone.type}',picture_drone_link='${drone.picture_drone_link}' WHERE id_drone='${id}'`)

    let message = 'Error in updating the drone ';
      
    if (result.affectedRows) {
      message = 'drone updated successfully';
    }
  
    return {message};
}
async function Removedrone(id){
    const result = await db.query(`DELETE FROM drones WHERE id_drone='${id}'`)
    let message = 'Error in deleting the drone ';
      
    if (result.affectedRows) {
      message = 'drone deleted successfully';
    }
  
    return {message};
    
}

module.exports ={
GetDrones,
Createdrone,
Updatedrone,
Removedrone
}