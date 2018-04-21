<template>
	<div>
		<div v-transfer-dom>
       	  <popup v-model="show0" position="bottom">
       	  	<divider>密码修改</divider>
       	  	<group>
       	  		<x-input class="input" placeholder="输入原密码" v-model="oldPass" required :min="8"></x-input>
                <x-input class="input" placeholder="输入新密码" v-model="newPass" required :min="8"></x-input>
       	  		<x-button type="primary" @click.native="show0=false" plain.type="primary">确认修改</x-button>
       	  	</group>
       	  </popup>
    </div>
	</div>
</template>

<script>
	import {Popup,Divider,Group,XInput,TransferDom,XButton} from 'vux'
	export default {
		 directives: {
		    TransferDom
		  },
		  components:{
		  	Popup,Divider,XInput,Group,XButton
		  },
		  data(){
             return {
             	oldPass:'',
             	newPass:'',
             }
		  },
		  computed:{
		  	show0:
		  	  {
		  	  	 get:function(){
		  	  	 	 return this.show
		  	  	 },
		  	  	 set:function(newValue){
		  	  	 	if (newValue==false){
		  	  	 		this.$emit('reset1')
		  	  	 	}
		  	  	 },
		  	  },
		  },
		  props:['show'],
	}

</script>