import mysql from 'mysql';

const connection =  mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:"employms", 
  });

  connection.connect(function (err){
    if(err){
        console.log(err.message)
    } else{
        console.log("sql is connected brother")
    }
  });



  export default connection;