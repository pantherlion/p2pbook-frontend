<template>
	<div>
		<group>
			<cell link="/main/swap/main/deal-info" inline-desc="pantherlion" primary="content">
				<p slot="icon" class="center"><img :src="url"></p>
				<flow >

				<flow-state state="2" title="邮寄"></flow-state>
				<flow-line is-done></flow-line>

				<flow-state state="3" title="管理员审核"></flow-state>
				<flow-line tip="进行中"></flow-line>

				<flow-state state="5" title="完成"></flow-state>
			  </flow>
			</cell>
			
		</group>
	</div>
</template>

<script>
	import {Flow,FlowState,FlowLine,CellFormPreview,Group,Cell} from 'vux'
	export default {
	  components: {
	    Flow,FlowState,FlowLine,CellFormPreview,Group,Cell
	  },
	  data(){
        return {
        	url:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        }
	  },
	}
</script>

<style lang="less" scoped>
	.center img {
	  width: 65px;
	  height: 65px;
	  border-radius: 50%;
	  border: 4px solid #ececec;
	}
</style>