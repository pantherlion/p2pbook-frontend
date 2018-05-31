<template>
	<div>
      <x-header>发布闲置书籍</x-header>
      <div>
        <p class="center"><img  :src="book.url" @click="$refs.upload_file.click()"></p>
        <p><input  @change="fileChange()" type="file" ref="upload_file" style="display:none"/></p>
          <group label-align="left" label-width="100px">
             <x-input title="书名" ref="bookName" placeholder="必填" v-model="book.bookName" required></x-input>
             <x-input title="出版社" ref="publisher" placeholder="必填" v-model="book.publisher" required></x-input>
             <x-input title="作者" ref="author" placeholder="必填" v-model="book.author" required></x-input>
             <x-number :value="0" :min="0" :max="1000" title="售价" v-model="book.price" fillable></x-number>
             <selector title="种类" v-model="book.category" :options="ids"></selector>
             <x-textarea title="描述" :max="200" v-model="book.desc"  placeholder="可选"></x-textarea>
            <x-button type="primary" @click.native="submit">提交</x-button>
        </group>
      </div>
      <alert v-model="show" title="发布成功"></alert>
      <alert v-model="show1" title="请检查填写的数据"></alert>
	</div>
</template>
<script>
	import { Group,XInput,XButton,XNumber,XTextarea,XHeader,Alert,Selector } from 'vux'
  import jQuery from 'jquery'
	export default {
	  components: {
	     Group,XInput,XButton,XNumber,XTextarea,XHeader,Alert,Selector
	  },
	  data(){
	  	return {
          book:{
            bookName:'',
            publisher:'',
            author:'',
            price:'',
            desc:'',
            category:'0',
            url:'',
          },
          ids:[
              {key:'0',value:'信息技术'},
              {key:'1',value:'文学'},
              {key:'2',value:'言情'},
              {key:'3',value:'玄幻'},
              {key:'4',value:'亲子'},
              {key:'5',value:'惊悚'},
              {key:'6',value:'都市'},
            ],
          show:false,
          show1:false,
	  	}
	  },
    methods:{
      fileChange(){
          let $this =this
          let img=this.$refs.upload_file.files[0]
          let fr = new FileReader()
          fr.readAsDataURL(img);
          fr.onloadend =function(){
            $this.book.url=this.result
          }
      },
      submit(){
       let $this=this
       //验证表单填写是否正确
        for(let key in $this.$refs){
          let item =  $this.$refs[key]
          if('valid' in item){
            if(item.valid==false){
              $this.show1=true
              return
            }
          }
        }

       jQuery.ajax({
              type:'post',
              url:'/p2pbook/add-book',
              data:JSON.stringify($this.book),
              contentType:"application/json;charset=UTF-8",
              success:function(data){
                 if(data.result=='success'){
                  $this.show=true;
                 }
              }
            })
      },
    }

	}
</script>
<style lang="less" scoped>
.center {
    text-align: center;
    padding-top: 20px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border: 4px solid #ececec;
  }
</style>