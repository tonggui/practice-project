<template>
  <div>
    <div class="search">
      <!--logo部分-->
      <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" alt="" class="logo">
      <!--查询输入框-->
      <div class="sear-box">
        <input v-model="kw" type="text" @keydown.down="down"  @keydown.prevent.up="up" @keydown.enter="toDetail(idx,2)">
      </div>
      <div class="btn">
        百度
      </div>
    </div>
    <!--查询出的相关关键字列表-->
    <div class="info">
      <ul>
        <li v-for="(item,index) in kwArr" @mouseenter="showIdx(index)" @click="toDetail(item,1)" :class="{'cur': idx == index }" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
      name: "searchResult",
    data() {
      return {
        kw: '', //查询的关键字
        newScript: null, // 新的查询jsonp的script
        oldScript: null,// 旧的查询jsonp的script
        kwArr: null, // 关键字数字
        idx: -1 // 当前查询关键字数组kwArr的下标
      }
    },
    // 实时监听kw关键字
    watch:{
      kw(val) {
        if(this.oldScript && val) {
          document.body.removeChild(this.oldScript)
        }
        if(!val) {
          this.kw = ''
          this.kwArr = []
          return
        }
        //判读如果有旧的script标签，清除掉

        // 请求JSONP数据
        this.newScript = document.createElement("script");
        // 给创建的script标签添加src属性，是百度的接口地址
        this.newScript.src = "http://suggestion.baidu.com/su?cb=callback&wd="+val

        // 上树
        document.body.appendChild(this.newScript)
        // 接收已经上树的script，目的是为了防止script标签进行累积上树
        this.oldScript = this.newScript
        this.callbackFun()
      }
    },

    methods:{
      // 回调jsonp函数
      callbackFun() {
        let that = this;
        window.callback = function(data) {
          that.kwArr = data.s
        }
      },
      // 键盘事件
      down() {
        this.idx++
        // 判断范围
        if(this.idx > this.kwArr.length - 1) {
          this.idx = -1;
        }
      },
      // 键盘事件
      up() {
        this.idx--
        // 判断范围
        if(this.idx < -1) {
          this.idx = this.kwArr.length - 1
        }
      },
      // 点击当前的li统一对应的下标
      showIdx(num) {
        this.idx = num
      },
      // 跳转到详情
      toDetail(val,type){
        // type是类型，如果传入的是1，则代表关键字直接搜索，如果为2，则代表从已有的kwArr中获取对应的下标搜索
        let kw = null
        if(type == 1) {
          kw = val
        } else if(type == 2) {
          kw = this.kwArr[val]
        }
        window.open('https://www.baidu.com/s?ie=utf-8&wd='+kw,'_blank')
      }
    }
  }
</script>

<style scoped>
  .search .logo{
    width: 101px;
    height: 33px;
    margin-right: 5px;
  }
  .search .sear-box{
    display: inline-block;
    width: 558px;
    height: 36px;
    border: 2px solid #c4c7ce;
    border-radius: 10px 0 0 10px;
    border-right: 0;
    overflow: visible;
    vertical-align: middle;
  }
  .search .sear-box input{
    outline: 0;
    font: 16px/18px arial;
    padding: 10px 0 10px 14px;
    margin: 0;
    width: 484px;
    background: transparent;
    border: 0;
  }
  .search .btn{
    display:inline-block;
    vertical-align: middle;
    width: 112px;
    cursor: pointer;
    height: 40px;
    line-height: 41px;
    line-height: 40px\9;
    background-color: #4e6ef2;
    border-radius: 0 10px 10px 0;
    font-size: 17px;
    box-shadow: none;
    font-weight: 400;
    color: #fff;
    text-align: center;
  }
  .info {
    padding-left: 60px;
    line-height: 30px;
    font-size: 14px;
  }
  .info ul li {
    list-style: none;
    cursor: pointer;

  }
  .info ul li.cur{
    color: #4e71f2;
  }

</style>
