<template>
	<div>
		<x-header :left-options="{showBack: false}">我的阅读</x-header>
		<panel  :list="list" v-if="list.length>0" type="1" @on-click-item="toMyReadDetail"></panel>
		<msg style="margin-top:70px;" v-if="list.length==0" title="暂无阅读计划"  icon="waiting">
			<template slot="buttons">
				<x-button type="primary" @click.native="refresh">刷新</x-button>
			</template>
		</msg>
		<popup v-model="showReadDetail" width="100%" position="right" should-rerender-on-show >
			<x-switch title="" v-model="showReadDetail"></x-switch>
			<MyReadDetail v-if="showReadDetail" :myread="selectedReadDetail" @refresh="refresh"/>
		</popup>
	</div>
</template>	

<script>
	import {Panel,Popup,XSwitch,XHeader,Msg,XButton} from 'vux'
	import MyReadDetail from '@/components/myread/myread-detail'
	import jQuery from 'jquery'
	function getMyRead($vue){
		jQuery.ajax({
				type:'post',
				url:'p2pbook/getMyRead',
				success:function(data){
					$vue.list=[]
					data.forEach((item,index)=>{
						let myRead={}
						myRead.src=item.book.url
						myRead.title=item.book.bookName
						myRead.desc=item.book.publisher+'-'+item.book.author
						myRead.meta=item
						$vue.list.push(myRead)
					})
				}
			})
	}
	export default {
		components:{
			Panel,MyReadDetail,Popup,XSwitch,XHeader,Msg,XButton
		},
		methods:{
			toMyReadDetail(item){
				this.selectedReadDetail=item.meta
				this.showReadDetail=true
			},
			refresh(){
				getMyRead(this)
				this.showReadDetail=false
			}
		},
		created(){
			getMyRead(this)
		},
		data(){
           return {
           	  list:[],
           	  showReadDetail:false,
           	  selectedReadDetail:null,
           }
		},
	}
</script>