<template>
	<div>
		<group title="置换甲方" label-align="left" label-width="140px">
		   <cell title="发布人" value="1196385362@qq.com"></cell>
		   <cell title="书名" value="tensorflow"></cell>
		   <cell title="作者" value="黎明"></cell>
		   <cell title="出版社">新华出版社</cell>
        </group>

        <group title="置换乙方" label-align="left" label-width="140px">
           <cell title="发布人" value="1196385362@qq.com"></cell>
		   <cell title="书名" value="tensorflow"></cell>
		   <cell title="作者" value="黎明"></cell>
		   <cell title="出版社">新华出版社</cell>
        </group>

        <x-button type="primary" >同意置换</x-button>
        <x-button type="warn">拒绝置换</x-button>

	</div>
</template>

<script>
	import {Group,Cell,XButton} from 'vux'
	export default {
	 	components:{
			Group,Cell,XButton 
		},
	}
</script>