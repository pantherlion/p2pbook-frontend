<template>
	<div>
		<form-preview  :body-items="list" ></form-preview>
    <x-button @click.native="addMyRead" v-if="book!=null && book.status==0" type="primary">添加到我的阅读</x-button>
    <x-button @click.native="removeMybook" v-if="book!=null && book.status==0" type="warn">删除</x-button>
	</div>
</template>

<script>
import { FormPreview,XButton,Alert } from 'vux'
import jQuery from 'jquery'

function addMyRead($vue){
  $vue.book.page=0
  let param={bookId:$vue.book.id}
  jQuery.ajax({
    type:'post',
    url:'p2pbook/addMyRead',
    data:jQuery.param(param),
    success:function(data){
      if(data.result=='success'){
         $vue.$emit('refresh')
      }
    },
  })
}

function removeMybook($vue){
  let param={bookId:$vue.book.id}
  jQuery.ajax({
    type:'post',
    url:'p2pbook/removeBook',
    data:jQuery.param(param),
    success:function(data){
      if(data.result=='success'){
         $vue.$emit('refresh')
      }
    },
  })
}

export default {
  components: {
    FormPreview,XButton,Alert
  },
  data(){
    return {
      showAddSuccess:false,
      showRemoveSuccess:false,
    }
  },
  props:['book'],
  methods:{
    addMyRead(){
      addMyRead(this)
    },
    removeMybook(){
      removeMybook(this)
    }
  },
  computed:{
  		list:function(){
        if(!this.book){
          return []
        }
        return [
          {
            label: '书名',
            value:this.book.bookName,
          },
          {
            label:'作者',
            value:this.book.author,
          },
          {
            label:'出版商',
            value:this.book.publisher
          },
          {
            label:'售价',
            value:this.book.price
          },
          {
            label:'描述',
            value:this.book.desc
          },
          {
            label:'状态',
            value:this.book.status==0?'在库':this.book.status==1?'已交易':'已加入阅读计划'
          }
        ]
      }
  }
}
	
</script>