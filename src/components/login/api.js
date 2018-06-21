import jQuery from 'jquery'
function login(data){
   return new Promise(function(resolve,reject){
   	    jQuery.ajax({
          type:'post',
          url:'/p2pbook/login',
          data:data,
          contentType:"application/json;charset=UTF-8",
          success:function(data){
          	resolve(data)
          }
        })
   })
}

export {login}