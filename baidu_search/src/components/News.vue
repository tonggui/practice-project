<template>
<div class="news-title">
  <div class="content">
    <ul class="list">
      <li  v-for="(item, index) in newsData" :key="index">
        <strong>
          {{item}}
        </strong>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
    export default {
        name: "News",
      data () {
        return {
          newsId:[],
          newsData: [],
        }
      },
      created() {
        this.$http.get('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
          .then(res=>{
            let data = res.data
            for(let i = 0; i < 30; i++) {
              this.newsId.push(data[i])
            }
            this.newsId.forEach(item=>{
              this.$http.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
                .then(res=>{
                  console.log(res.data)
                  this.newsData.push(res.data.title)
            })
          })
          }).catch(err=>{
            console.log(err)
          })

      },
      methods: {}
    }
</script>

<style scoped>
.news-title{
font-size: 16px;
  position: absolute;
}
.content{

}
.list{
  list-style-type: circle;
}
  li{
    padding-left: 10px;
    line-height: 24px;
    position: relative;
    overflow: hidden;
  }
</style>
