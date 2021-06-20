<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="message" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="item in moveList" :key="item.id">
          <div class="img">
            <img :src="item.img | setWH('128.150') " />
          </div>
          <div class="info">
            <p>
              <span>{{item.nm}}</span>
              <span v-if="item.sc==0">即将上映</span>
              <span v-else>{{item.sc}}</span>
            </p>
            <p>{{item.enm}}</p>
            <p>{{item.cat}}</p>
            <p>{{item.rt}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name : 'Search',
    data(){
      return {
        message : '',
        moveList : []
      }
    },
    methods: {
        //这是一个取消axios多次请求的方法
        cancelRequest() {
            if (typeof this.source === 'function') {
                this.source('终止请求')
            }
        }
    },
    watch:{
      message(newVal){
         var that = this;
        this.cancelRequest()

        this.axios.get(`/ajax/search?kw=`+newVal +`&cityId=10&stype=-1`,
        {
           cancelToken: new this.axios.CancelToken(function (c) {
                    that.source = c;
                })
        }
        ).then((res) => {
          console.log(res)
          let msg = res.statusText;
          let data = res.data
			    if(msg && data){
            this.moveList = res.data.movies.list
          }
         }).catch((err) => {
                if (this.axios.isCancel(err)) {
                	//请求如果被取消，这里是返回取消的message
                    console.log('Rquest canceled', err.message); 
                } else {
                    console.log(err);
                }
            })
      }
    }

}
</script>

<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}

.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}

.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
.search_body .search_result .info p:nth-of-type(2){
overflow: hidden;
}
</style>
