const database = require('./database');
module.exports ={
  getMenus(){
    return new Promise((resolve, reject)=>{
        database.query(
          'SELECT * FROM tb_menus ORDER BY title',
          (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          },
        );
    })
  }
}
