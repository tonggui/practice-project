<template>
  <div class="hello">
    <ul>
      <li>
        <a  @click="handleNews">
          新闻
        </a>
      </li>
    </ul>
    <div class="top">
      <img src="//www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" width="270" height="129" onerror="this.src='https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1-66368c33f8.png';this.onerror=null;" usemap="#mp">
      <map name="mp">
        <area style="cursor:pointer;outline:none;" shape="rect" coords="0,0,270,129" href="//www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6%E7%83%AD%E6%90%9C&amp;sa=ire_dl_gh_logo_texing&amp;rsv_dl=igh_logo_pc" target="_blank" title="点击一下，了解更多" onmousedown="return ns_c({'fm':'behs','tab':'bdlogo'})">
      </map>
    </div>
    <span id="s_kw_wrap" class="bg s_ipt_wr new-pmd quickdelete-wrap sam_res_del">
      <span class="soutu-btn"></span>
   <el-autocomplete
     class="inner"
     v-model="searchData"
     :fetch-suggestions="handleSuggest"
     :trigger-on-focus="false"
            @select="handleSelect"
            @keyup.enter.native="handleSearch"
          >
      </el-autocomplete>
      <el-button type="primary" @click="handleSearch">百度一下</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      searchData: '',
      suggestionWords: [  {id:1, "value": "李子" },
        { id:2,"value": "李子"},
        { id:3,"value": "荔枝"},
        { id:4,"value": "香蕉"},
        { id:5,"value": "西瓜"}]
    }
  },
  methods: {
    handleSuggest(queryString, cb) {
      let tmp = this.suggestionWords
      let results = queryString ? tmp.filter((query) => {
        return (query.value.indexOf(queryString) === 0);
      }) : tmp;
      console.log(results)
      cb(results)
    },
    handleSelect(item) {
      console.log(item);
      this.searchData = item.value
      this.handleSearch()
    },
    handleSearch(){
      this.$router.push({
        name: 'SearchRes',
        params: {
          searchData: this.searchData
        }
      })
    },
    handleNews() {
      this.$router.push({
        name: 'News'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    margin-top: 60px;
    text-align: center;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a{
  color: #000000;
}
a:hover {
  color: #315efb;
}
  .inner{
    width:35%;
  }
.el-button--primary {
  cursor: pointer;
  width: 108px;
  height: 40px;
  line-height: 40px;
  margin-left:-5px;
  padding: 0;
  background: 0 0;
  background-color: #4e6ef2;
  border-radius: 0 10px 10px 0;
  font-size: 17px;
  color: #fff;
  box-shadow: none;
  font-weight: 400;
  border: none;
  outline: 0;
  vertical-align: bottom;
}
</style>
