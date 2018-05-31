<template>
	<div>
    <group label-align="left" label-width="120px">
      <cell title="书名" :value="bookName"></cell>
      <cell title="出版社" :value="publisher"></cell>
      <cell title="作者" :value="author"></cell>
      <cell title="价格" :value="price"></cell>
      <cell title="计划业务页数">
         <inline-x-number style="display:block;" :min="0" v-model="page"  width="50px" button-style="round"></inline-x-number>
      </cell>
      <cell title="下次计划打卡时间">
         <inline-calendar
            class="inline-calendar-demo"
            v-model="deadline"
            :show-last-month="false"
            :highlight-weekend="true"
            :disable-past="true">
            </inline-calendar>
      </cell>
    </group>

    <x-button type="primary" >更新阅读计划</x-button>
    <x-button style="margin-top:15px;"  type="warn" @click.native="deleteMyRead">删除阅读计划</x-button>
	</div>
</template>

<script>
import {XButton,Group,Cell,InlineXNumber,InlineCalendar } from 'vux'
import jQuery from 'jquery'

function deleteMyRead($vue){
    let param={bookId:$vue.myread.book.id}
    jQuery.ajax({
        type:'post',
        url:'p2pbook/deleteMyRead',
        data:jQuery.param(param),
        success:function(data){
          if(data.result=='success'){
            $vue.$emit('refresh')
          }
        }
      })
  }

export default {
  components: {
    XButton,Group,Cell,InlineXNumber,InlineCalendar 
  },
  props:['myread'],
  methods:{
    deleteMyRead(){
      deleteMyRead(this)
    }
  },
  data(){
    let myDate = new Date();
    return{
      bookName:this.myread!=null?this.myread.book.bookName:'',
      publisher:this.myread!=null?this.myread.book.publisher:'',
      author:this.myread!=null?this.myread.book.author:'',
      price:this.myread!=null?this.myread.book.price:'',
      page:this.myread!=null?this.myread.page:0,
      deadline:myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
    }
  }
}
	
</script>