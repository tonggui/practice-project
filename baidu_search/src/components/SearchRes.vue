<template>
  <div class="hello">
    <div>
      <img class="index-logo-src" src="//www.baidu.com/img/flexible/logo/pc/result.png" alt="到百度首页" title="到百度首页">
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
    </div>
      <div>
      <ul>
        <li class="content" v-for="item in dataList"
            :key="item">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchRes',
  data () {
    return {
      searchData: this.$route.params.searchData,
      searchRes: [],
      suggestionWords: [  {id:1, "value": "三全鲜食（北新泾店）" },
        { id:2,"value": "Hot honey 首尔炸鸡（仙霞路）"},
        { id:2,"value": "新旺角茶餐厅"},
        { id:2,"value": "泷千家(天山西路店)"}],
      dataList:[1,2,3,4,5]
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
      let data = ['一','二','三','四','五']
      this.dataList = data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  position: fixed;
  min-width: 1060px;
  height: 70px;
  padding-left: 16px;
  padding: 0 0 0 10px;
  margin-top: 10px;
}
.index-logo-src{
  width: 101px;
  height: 33px;
}
  .inner{
    width:35%;
    margin-left: 15px;

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
  .content{
    overflow: hidden;
  }
</style>
