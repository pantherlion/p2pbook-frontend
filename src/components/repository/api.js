import jQuery from 'jquery'
export function queryByAuthorOrBookName(data){
	return new Promise(function(resolve,reject){
		jQuery.ajax({
  			type:'post',
  			url:'/p2pbook/show-allbook-byAuthorOrBookName',
  			data:data,
  			success:function(data){
  				resolve(data)
  			}
  		})
	})
}

export function queryByCategory(data){
	return new Promise(function(resolve,reject){
		jQuery.ajax({
	  		type:'post',
	  		url:'/p2pbook/show-allbook-byCategory',
	  		data:data,
	  		success:function(data){
	  			resolve(data)
	  		}
	  	})
	})
}