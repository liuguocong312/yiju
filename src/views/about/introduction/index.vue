<template>
  <div class="iotr">
    <about-header title="公司介绍"></about-header>
    <div class="right_content">
      <h5>新移居：移之所向，居之定所</h5>
      <h5>让世界通行无阻，让投资在无国界！</h5>

      <p>新移居是由海外房产，海外移民，海外金融以及互联网精英组建的团队。我们精选全球更安全，更保值的不动产类投资产品，为客户精选全球优质项目，提供一对一海外投资服务，轻松实现全球资产配置！</p>

      <p>新移居海外总部设立在墨尔本，中国总部在广州。以“安全，透明，保值，靠谱”为核心，为用户带来真正的价值。移居公司组建海外团队，从海外做起，为客户解决长久以来海外投资的后续服务问题，让客户在海外同样轻松享受VIP服务。</p>

      <p>新移居将继续秉承核心价值观，引入更多适合中国人的投资方式和保值产品，希望帮助每个中国人抵抗风险，带给每个中国人资产安全感，引领全新的资产配置方式。</p>
      <h3>公司主营业务</h3>
      <h5>1. 移民服务</h5>
      <p>为客户提供澳洲投资移民 欧洲购房移民，护照移民等移民项目，覆盖20个国家，超40个项目。有平均超8年行业经验的资深人员为您服务。</p>

      <h5>2. 海外地产</h5>
      <p>为客户提供海外最新的地产投资项目，项目涵盖公寓、别墅、商业、写字楼。操作流程熟练，服务透明专业。同时搭配全面的金融服务为客户解决贷款等问题。</p>

      <h5>3. 后续服务</h5>
      <p>在海外组建后续服务端团队，包括，澳洲，欧洲，东南亚等国家都有专业的本地团队为客户提供登陆之后的生活服务，帮助客户尽快适应当地环境，妥善安排好物业的后续出租和转售服务。</p>

      <h3>公司优势</h3>
      <p>集结经验丰富的团队，平均从业8年以上</p>
      <p>积累大量成功经验，累计服务几百个家庭</p>
      <p>国际化中外团队，提供完善的后续服务</p>
      <p>客户服务做到2vs1，两个顾问全程跟踪服务</p>
    </div>
    <br>
    <p><h3>公司荣誉</h3></p>
    <p><br></p>
    <el-carousel :interval="4000" type="card" class="swiper" height="200px">
      <el-carousel-item v-for="(item,index) in imgList" :key="item">
        <div class="image">
          <img :src="item.path" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import aboutHeader from '@/components/aboutheader'
  export default {
    name: 'iotr',
    components: {
      aboutHeader
    },
    data() {
      return {
        imgList: [{
            path: require('../../../assets/img/Partner/01.jpg')
          },
          {
            path: require('../../../assets/img/Partner/02.jpg')
          },
          {
            path: require('../../../assets/img/Partner/03.jpg')
          },
          {
            path: require('../../../assets/img/Partner/04.jpg')
          },
          {
            path: require('../../../assets/img/Partner/05.jpg')
          },
        ]
      }
    },
    methods: {}
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .iotr {
    padding: 30px 60px;

    .right_content {
      padding-top: 35px;
      line-height: 25px;

      p {
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        color: #424242;
        font-size: 14px;
      }
    }

    .swiper {
      margin-top: 40px;

      .el-carousel__item .image {
        height: 200px;
        width: 300px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }




  }

</style>
