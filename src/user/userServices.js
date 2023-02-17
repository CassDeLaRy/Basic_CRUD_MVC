var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);
const mongoose = require('mongoose');

module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email}, function getResult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }else{
            if(result !=undefined &&  result !=null){
               resolve({status: false,msg: "El usuario ya existe"});
            }else{
               var userModelData = new userModel();
               userModelData.firstname = userDetails.firstname;
               userModelData.lastname = userDetails.lastname;
               userModelData.email = userDetails.email;
               userModelData.password = userDetails.password;
               var encrypted = encryptor.encrypt(userDetails.password);
               userModelData.password = encrypted;
               userModelData.save(function resultHandle(error, result) {
                  if (error) {
                        reject({status: false,msg: "A ocurrido algun error en la creación del usuario"});
                  } else {
                        resolve({status: true,msg: "Usuario creado correctamente"});
                  }
               });
      
            }
         }
      })
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.finduserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(result) {
            resolve({status: true, msg: "Encontrado", "firstname": result.firstname, "lastname": result.lastname })            
         }
         else {
            reject({status: false, msg: "No encontrado"});
         }
      });
   });
}

module.exports.deleteUseDBService = (userDetails)=> {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndDelete({ email: userDetails.email},function getresult(errorvalue, result) {
         
         if(errorvalue) {
            reject({status: false, msg: "No eliminado"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: "Usuario Encontrado - ELIMINADO- "});  
            }
            else {
               reject({status: false,msg: "Detalles de usuario a eliminar invalido"});
            }
         }
      });
   });
}
//Actualizar
module.exports.updateUseDBService = (userDetails)=> {
   var encrypted = encryptor.encrypt(userDetails.password);
   userDetails.password=encrypted;
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndUpdate({ email: userDetails.email},userDetails,function getresult(error, result) {
         
         if(error) {
            reject({status: false, msg: "No ACTUALIZADO"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: "Usuario Encontrado - ACTUALIZADO- "});  
            }
            else {
               reject({status: false,msg: "Detalles de usuario a ACTUALIZADO invalido"});
            }
         }
      });
   });
}
