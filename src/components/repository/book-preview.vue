<template>
	<div>
		<!--产品简介-->
		<flexbox :gutter="0" wrap="wrap">
			<flexbox-item :span="1/3" v-for="(item, index) in list" >
				<div style="width:100px;height:100px;padding:5px;line-height:100px">
					<img class="previewer-demo-img" :src="item.src"  width="100" height="100" @click="show(index)">
				</div>
				<div style="margin-bottom:10px" @click="$router.push('/main/repository/book-detail')">
					<p style="font-size:10px">{{item.bookname}}</p>
				    <p style="font-size:10px">{{item.author}}</p>
				</div>
			</flexbox-item>
		</flexbox>
		
	    <div v-transfer-dom>
	      <previewer :list="list" ref="previewer" :options="options" ></previewer>
	    </div>
	</div>
</template>	

<script>
	import {Previewer,TransferDom,Flexbox,FlexboxItem } from 'vux'
	export default {
		directives: {
		    TransferDom,
		 },
		components:{
			Previewer,Flexbox,FlexboxItem
		},
		methods:{
			show(index){
				this.$refs.previewer.show(index)
			}
		},
		data(){
           return {
           	  list:[
                   {
                   	 msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
			         src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
			         bookname:'数据结构与算法',
			         author:'李林',
                   },
                 {
			        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
			        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
			        bookname:'Linux程序设计实践',
			        author:'胡向军',
			      }, {
			        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
			        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
			        bookname:'中国特色社会主义理论',
			        author:'师弟领导',
			      },
			      {
			        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
			        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
			        bookname:'中国特色社会主义理论',
			        author:'师弟领导',
			      },
           	   ],
           	   options: {
		        getThumbBoundsFn (index) {
		          // find thumbnail element
		          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
		          // get window scroll Y
		          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
		          // optionally get horizontal scroll
		          // get position of element relative to viewport
		          let rect = thumbnail.getBoundingClientRect()
		          // w = width
		          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
		          // Good guide on how to get element coordinates:
		          // http://javascript.info/tutorial/coordinates
		        }
		      },
           }
		},
	}
</script>