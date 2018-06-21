 import jQuery from 'jquery'

 export function getDeals(data){
  	return new Promise(function(resolve,reject){
  		jQuery.ajax({
	  	 	type:'get',
	  	 	url:'p2pbook/getDeals',
	  	 	data:data,
	  	 	success:function(data){
	  	 		resolve(data)
	  	 	},
  	 })
  	})
  }


export function agreeDeal(data){
 	return new Promise(function(resolve,reject){
 		jQuery.ajax({
			type:'post',
			url:'p2pbook/agreeDeal',
			data:data,
			success:function(data){
				resolve(data)
			}
		})
 	})
}

export function rejectDeal(data){
	return new Promise(function(resolve,reject){
		jQuery.ajax({
			type:'post',
			url:'p2pbook/rejectDeal',
			data:data,
			success:function(data){
				resolve(data)
			}
		})
	})
}


