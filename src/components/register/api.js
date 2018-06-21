import jQuery from 'jquery'

//获取校验码
function getCertPic(){
	return new Promise(function(resolve,reject){
	jQuery.ajax({
		type:'get',
		url:'/p2pbook/getCertPic',
		success:function(data){
			resolve(data)
		}
	})
 })
}

//用户注册
function register(data){
	return new Promise(function(resolve,reject){
		jQuery.ajax({
	      type:'post',
	      url:'/p2pbook/register',
	      data:data,
	      contentType:"application/json;charset=UTF-8",
	      success:function(data){
	      	resolve(data)
	      }
	    })
	})
}

export {getCertPic,register}

