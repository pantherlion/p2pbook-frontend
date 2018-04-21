<template>
	<div>
		<form-preview  :body-items="list" ></form-preview>
    <x-button  type="warn">删除</x-button>
	</div>
</template>

<script>
import { FormPreview,XButton } from 'vux'

export default {
  components: {
    FormPreview,XButton
  },
  data(){
  	return {
  		list:[
           {
           	 label:'书名',
           	 value:'tensorflow',
           },
           {
           	label:'出版社',
           	value:'人民邮电出版社',
           },
           {
           	label:'作者',
           	value:'徐全智',
           },
           {
           	label:'价格',
           	value:'￥15.2'
           },
           {
           	label:'描述',
           	value:'蓝色的法律了解了你睡了呢'
           }
  		]
  	}
  }
}
	
</script>