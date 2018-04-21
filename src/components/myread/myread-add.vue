<template>
	<div>
	  <group label-align="left" label-width="100px">
      	 <x-input title="书名" placeholder="必填" v-model="bookname"></x-input>
      	 <x-input title="出版社" placeholder="必填" v-model="publisher"></x-input>
      	 <x-input title="作者" placeholder="必填" v-model="author"></x-input>
      	 <x-textarea title="描述" :max="200" v-model="desc"  placeholder="可选"></x-textarea>
      </group>    
      <x-button type="primary" @click.native="">提交</x-button>
	</div>
</template>
<script>
	import {Group,XInput,XButton,XNumber,XTextarea,XHeader} from 'vux'
	export default {
	  components: {
	     Group,XInput,XButton,XNumber,XTextarea,XHeader
	  },
	  data(){
	  	return {
          bookname:'',
          publisher:'',
          author:'',
          price:'',
          desc:'',
	  	}
	  },
	}
</script>
<style lang="less">
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
</style>