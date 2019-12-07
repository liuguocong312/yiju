<template>
  <div>
    <house-swiper></house-swiper>
    <div class="radios_box">
      <div class="main_box">
        <ul class="container">
          <li class="selitems">
            <router-link class="navitem" to="/">移居</router-link>
            <!--<a  class="navitem" @click="clearAll">全球房产</a>-->
            <router-link class="navitem" to="/house">海外房产</router-link>
            <template
              v-for="(item,index) in queryData"
              v-if="(item>0 && index!=1) || (typeof item=='object' && item.includes(1)) || (item>=0 && index==1)"
            >
              <a class="navitem" @click="clearNav(index)">{{getNavBarItem(item,index)}}</a>
            </template>
          </li>
          <li class="selitems" style="position: relative">
            <span class="itemlabel">热门国家:</span>
            <div class="sels">
              <a class="sel" :class="{'active':queryData[0]==0}" @click="change(0,0)">全部</a>
              <a
                class="sel sel-auto"
                v-if="index<16"
                v-for="(item,index) in selData.countryData"
                @click="change(0,index+1)"
                :class="{'active':queryData[0]==index+1}"
              >{{item.label}}</a>
              <a
                class="sel sel-auto"
                style="margin-top: 10px"
                v-if="index>16 && showMoreNation"
                v-for="(item,index) in selData.countryData"
                @click="change(0,index+1)"
                :class="{'active':queryData[0]==index+1}"
              >{{item.label}}</a>
              <!--<a class="sel" style="position: absolute;top:1px;right: -16px" @click="showMoreNation=!showMoreNation">{{showMoreNation?"收起":"更多"}}</a>-->
            </div>

            <div class="states" v-if="queryData[0]!=0 && selData.stateData.length!=0">
              <a
                class="sel fix"
                v-for="(item,index) in selData.stateData"
                @click="change(1,index)"
                :class="{'active':queryData[1]==index}"
              >{{item.label}}</a>
            </div>
          </li>
          <li class="selitems">
            <span class="itemlabel">价格区间:</span>
            <div class="sels">
              <a class="sel" :class="{'active':queryData[2]==0}" @click="change(2,0)">全部</a>
              <a
                class="sel fix"
                v-for="(item,index) in selData.priceData"
                @click="change(2,index+1)"
                :class="{'active':queryData[2]==index+1}"
              >{{item.label}}</a>
            </div>
          </li>
          <li class="selitems">
            <span class="itemlabel">置业目的:</span>
            <div class="sels">
              <a class="sel" :class="{'active':queryData[3]==0}" @click="change(3,0)">全部</a>
              <a
                class="sel fix"
                v-for="(item,index) in selData.tarData"
                @click="change(3,index+1)"
                :class="{'active':queryData[3]==index+1}"
              >{{item.label}}</a>
            </div>
          </li>

          <li class="selitems">
            <span class="itemlabel">项目类型:</span>
            <div class="sels">
              <a class="sel" :class="{'active':queryData[4]==0}" @click="change(4,0)">全部</a>
              <a
                class="sel fix"
                v-for="(item,index) in selData.type1Data"
                @click="change(4,index+1)"
                :class="{'active':queryData[4]==index+1}"
              >{{item.label}}</a>
            </div>
          </li>
          <template v-if="showMore">
            <li class="selitems">
              <span class="itemlabel">房源类型:</span>
              <div class="sels">
                <a class="sel" :class="{'active':queryData[5]==0}" @click="change(5,0)">全部</a>
                <a
                  class="sel fix"
                  v-for="(item,index) in selData.type2Data"
                  @click="change(5,index+1)"
                  :class="{'active':queryData[5]==index+1}"
                >{{item.label}}</a>
              </div>
            </li>
            <li class="selitems">
              <span class="itemlabel">户型数量:</span>
              <div class="sels">
                <a class="sel" :class="{'active':queryData[6]==0}" @click="change(6,0)">全部</a>
                <a
                  class="sel fix"
                  v-for="(item,index) in selData.hCountData"
                  @click="change(6,index+1)"
                  :class="{'active':queryData[6]==index+1}"
                >{{item.label}}</a>
              </div>
            </li>
            <li class="selitems">
              <span class="itemlabel">房源特色:</span>
              <div class="sels">
                <a
                  class="sel"
                  :class="{'active':!queryData[7].includes(1)}"
                  @click="changeAllCheck"
                >全部</a>

                <div
                  class="sel fix checkbox"
                  v-for="(item,index) in selData.favData"
                  @click="changeCheck(index)"
                  :class="{'active':queryData[7][index]==1}"
                >
                  <i class="check_icon"></i>
                  <span>{{item.label}}</span>
                </div>
              </div>
            </li>
          </template>
        </ul>

        <div class="filter-reset">
          <a @click="clearAll">
            <img src="../../assets/img/del.png" alt />
            <span class="reset-title">重置条件</span>
          </a>
        </div>
      </div>
    </div>

    <div class="more_box">
      <div class="wrap" @click="showMore=!showMore">
        <span>{{showMore?"收起选项":"更多选项"}}</span>
        <img :src="showMore?iconClose:iconOpen" alt />
      </div>
    </div>

    <div class="wrap2">
      <div class="wrapbox2">
        <div class="filter_container">
          <a class="fitem" @click="changeSort(0)" :class="{'active':sortactive==0}">
            <span>默认排序</span>
          </a>
          <a class="fitem" @click="changeSort(1)" :class="{'active':sortactive==1}">
            <span>总价</span>
            <img :src="sortImg" alt />
          </a>
        </div>

        <ul class="salelist">
          <li
            class="saleitem"
            v-for="(item,index) in list"
            :key="index"
            @click="$router.push('/house/detail?id='+item.id)"
          >
            <div class="imgbox" :style="'background-image:url('+IMG_URL+item.projectImagePath+')'">
              <div>
                <img src="../../assets/img/gpsIcon.png" alt />
                <span>{{item.nationCityName}}</span>
              </div>
              <div class="img-sell">
                <span>{{item.projectStatus|sellState}}</span>
              </div>
            </div>
            <div class="contentbox">
              <div>
                <router-link :to="'/house/detail?id='+item.id" class="title">{{item.projectName}}</router-link>
              </div>
              <div class="detailbox">
                <div class="item">房产类型: {{item.categories.join(',')}}</div>
                <div class="item">可选户型: {{item.houseType}}</div>
                <div class="item">套内面积: {{item.houseArea}}</div>
                <div class="item">交楼时间: {{item.houseDeliveryTime}}</div>
              </div>
              <div class="connect_box">
                <div class="item">
                  总价:
                  <span class="price">{{item.minPriceAmt|cut}}</span>
                  {{item.priceUnit}}起 {{item.priceCcy}}
                </div>
                <div class="item">{{item.rmbconversion}}{{item.priceUnit}}起(人民币)</div>
                <!--<div class="item"><a class="collectbtn" @click="collect($event,item.favCount,item.id)">{{item.favCount==1?"取消收藏":"收藏"}}</a></div>-->
                <div class="item">
                  <a
                    class="collectbtn"
                    :class="{'disabled':!item.clickable}"
                    @click="collect($event,item.id,item.clickable,index)"
                  >{{item.clickable?"收藏":"取消收藏"}}</a>
                </div>

                <!--<div class="item"><a class="connectbtn">在线咨询</a></div>-->
              </div>
            </div>
          </li>
        </ul>

        <pagination
          v-model="pageInfo.pno"
          :changeHandle="pageChangeHandle"
          :maxPage="pageInfo.maxPage"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>


import store from "@/store";
import houseSwiper from "@/components/houseTopSwiper";
import pagination from "@/components/pagination";
import iconOpen from "@/assets/img/iconopen.png";
import iconClose from "@/assets/img/closemore.png";
import {
  getProjectCondition,
  getNation,
  list,
  getCityByPid
} from "@/api/house";
import { setFavProject, cancelFavProject } from "@/api/user";
import img1 from "@/assets/img/arrow_double.png";
import img2 from "@/assets/img/arrow_up_select.png";
import img3 from "@/assets/img/arrow_down_select.png";
export default {
  name: "house",
  data() {
    return {
      img1,
      img2,
      img3,
      sortImg: img1,
      sortactive: 0,
      sort: "DESC",
      iconOpen,
      iconClose,
      showMore: false,
      showMoreNation: false,
      queryData: [
        0, //country
        -1, //state
        0, //price
        0, //tar
        0, //type1
        0, //type2
        0, //hcount
        [0, 0, 0, 0, 0] //tag
      ],

      pageInfo: {
        pno: 1,
        maxPage: 1,
        size: 10
      },
      selData: {
        countryData: [
          { val: 1, label: "美国" },
          { val: 2, label: "泰国" },
          { val: 3, label: "日本" },
          { val: 4, label: "越南" },
          { val: 5, label: "菲律宾" },
          { val: 6, label: "澳大利亚" },
          { val: 7, label: "英国" },
          { val: 8, label: "阿联酋" },
          { val: 9, label: "马来西亚" },
          { val: 10, label: "柬埔寨" },
          { val: 11, label: "新加坡" },
          { val: 12, label: "加拿大" },
          { val: 13, label: "新西兰" },
          { val: 14, label: "希腊" },
          { val: 15, label: "意大利" },
          { val: 16, label: "西班牙" },
          { val: 17, label: "葡萄牙" },
          { val: 18, label: "德国" }
        ],

        stateData: [],

        priceData: [
          { val: 1, label: "50万以下" },
          { val: 2, label: "50-100万" },
          { val: 3, label: "100-200万" },
          { val: 4, label: "200-300万" },
          { val: 5, label: "300-500万" },
          { val: 6, label: "500-700万" },
          { val: 7, label: "700-1000万" },
          { val: 8, label: "1000以上" }
        ],

        tarData: [
          { val: 1, label: "投资" },
          { val: 2, label: "教育留学" },
          { val: 3, label: "购房移民" },
          { val: 4, label: "自住" }
        ],

        type1Data: [
          { val: 1, label: "独栋别墅" },
          { val: 2, label: "公寓" },
          { val: 3, label: "联排别墅" },
          { val: 4, label: "土地" },
          { val: 5, label: "商业地产" }
        ],

        type2Data: [{ val: 1, label: "新房" }, { val: 2, label: "二手房" }],

        hCountData: [
          { val: 1, label: "1居" },
          { val: 2, label: "2居" },
          { val: 3, label: "3居" },
          { val: 4, label: "4居" },
          { val: 5, label: "5居" },
          { val: 6, label: "5居以上" }
        ],

        favData: [
          { val: 1, label: "度假/自住房" },
          { val: 2, label: "房屋托管" },
          { val: 3, label: "包租" },
          { val: 4, label: "有优惠" },
          { val: 5, label: "允许贷款" }
        ]
      },
      list: []
    };
  },
  components: { houseSwiper, pagination },
  methods: {
    getCity() {
      if (this.queryData[0] != 0) {
        getCityByPid(this.selData.countryData[this.queryData[0] - 1].val).then(
          res => {
            this.selData.stateData = res.body.map(item => {
              return { val: item.id, label: item.name };
            });
          }
        );
      }
    },

    change(obj, index) {
      store.dispatch("TOGGLE_cityIndex", -1);
      if (obj == 1) {
        store.dispatch("TOGGLE_cityIndex", index);
      }
      if (obj == 0 && index != 0) {
        getCityByPid(this.selData.countryData[index - 1].val).then(res => {
          this.selData.stateData = res.body.map(item => {
            return { val: item.id, label: item.name };
          });
          this.queryData[1] = -1;
        });
      } else if (obj == 0 && index == 0) {
        this.queryData[1] = -1;
      }

      store.dispatch("TOGGLE_queryList", this.queryData);

      this.$set(this.queryData, obj, index);
    },
    changeSort(index) {
      if (this.sortactive == 0 && index == 1) {
        this.sortactive = index;
        this.sortImg = this.img3;
        this.pageInfo.pno = 1;
        this.getList();
        return;
      }
      if (index == 1) {
        if (this.sort == "DESC") {
          this.sort = "ASC";
          this.sortImg = this.img2;
        } else {
          this.sort = "DESC";
          this.sortImg = this.img3;
        }
      }

      if (index == 0) {
        this.sort = "DESC";
        this.sortImg = this.img1;
      }
      this.sortactive = index;
      this.pageInfo.pno = 1;
      this.getList();
    },
    pageChangeHandle(pno) {
      this.pageInfo.pno = pno;
      this.getList();
    },

    clearAll() {
      this.queryData = [
        0, //country
        -1, //state
        0, //price
        0, //tar
        0, //type1
        0, //type2
        0, //hcount
        [0, 0, 0, 0, 0] //tag
      ];
      store.dispatch("TOGGLE_cityIndex", -1);
      store.dispatch("TOGGLE_queryList", this.queryData);
      this.$router.push("/house");
    },

    changeCheck(index) {
      if (this.queryData[7][index] == 0)
        //this.queryData.tag[index]=1;
        this.$set(this.queryData[7], index, 1);
      else this.$set(this.queryData[7], index, 0);
    },

    changeAllCheck() {
      this.$set(this.queryData, 7, [0, 0, 0, 0, 0]);
    },

    getNavBarItem(item, index) {
      let lab = "";
      if (index == 7) {
        for (var i in item) {
          if (item[i] == 1) {
            lab += this.selData.favData[i].label + ",";
          }
        }
        lab = "标签:" + lab.substring(-1, lab.length - 1);
      } else {
        switch (index) {
          case 0:
            lab = "国家:" + this.selData.countryData[item - 1].label + "房产";
            break;
          case 1:
            lab = "城市:" + this.selData.stateData[item].label;
            break;
          case 2:
            lab = "价格:" + this.selData.priceData[item - 1].label;
            break;
          case 3:
            lab = "目的:" + this.selData.tarData[item - 1].label + "房";
            break;
          case 4:
            lab = "项目类型:" + this.selData.type1Data[item - 1].label;
            break;
          case 5:
            lab = "房源类型:" + this.selData.type2Data[item - 1].label;
            break;

          case 6:
            lab = "卧室数量:" + this.selData.hCountData[item - 1].label;
            break;
        }
      }

      return lab;
    },

    clearNav(index) {
      for (var i in this.queryData) {
        if (i > index) {
          if (i == 7) {
            this.$set(this.queryData, 7, [0, 0, 0, 0, 0]);
          } else {
            if (i == 1) {
              this.$set(this.queryData, i, -1);
            } else {
              this.$set(this.queryData, i, 0);
            }
          }
        }
      }
    },

    getProCon() {
      getProjectCondition().then(res => {
        this.selData.priceData = res.body[0].projectHousePriceTypeList.map(
          item => {
            return { val: item.id, label: item.typeName };
          }
        );

        this.selData.tarData = res.body[0].projectHomeGoalList.map(item => {
          return { val: item.id, label: item.goal };
        });

        this.selData.type1Data = res.body[0].categoryList.map(item => {
          return { val: item.id, label: item.name };
        });

        this.selData.type2Data = res.body[0].projectHousingTypesList.map(
          item => {
            return { val: item.id, label: item.typeName };
          }
        );

        this.selData.hCountData = res.body[0].projectHouseTypeList.map(item => {
          return { val: item.id, label: item.typeName };
        });

        this.selData.favData = res.body[0].projectHousingFeatureList.map(
          item => {
            return { val: item.id, label: item.feature };
          }
        );

        getNation(1).then(res => {
          let nation = this.$route.query.nation;
          let city = this.$route.query.city;
          this.selData.countryData = res.body.map(item => {
            return {
              val: item.id,
              label: item.name,
              nationCode: item.nationCode
            };
          });
          let data = this.selData.countryData;
          for (let i in data) {
            if (data[i].val == nation) {
              [data[0], data[i]] = [data[i], data[0]];
            }
          }

          //获取params

          if (nation) {
            for (let i in this.selData.countryData) {
              if (this.selData.countryData[i].val == nation) {
                this.queryData[0] = parseInt(i) + 1;

                getCityByPid(nation).then(res => {
                  this.selData.stateData = res.body.map((item, index) => {
                    if (city == item.id) this.queryData[1] = index;
                    return { val: item.id, label: item.name };
                  });
                });

                break;
              }
            }
          }
          this.getList();
        });
      });
    },

    getList() {
      let config = this.getConfig();
      list(config).then(res => {
        this.list = res.body.records.map(item => {
          let data = item.entity;
          data.clickable = item.clickable;
          return data;
        });
        this.pageInfo.maxPage = res.body.totalPages || 1;
        // window.scrollTo(0,0)
      });
    },

    getConfig() {
      let config = {
        term: "",
        sort: "",
        direction: "DESC",
        nationId: "",
        nationCityId: "",
        projectTypeIds: [1],
        tagIds: [],
        categoryIds: [],
        housePriceType: "",
        housingTypes: "",
        houseType: "",
        homeGoalIds: [],
        housingFeatureIds: [],
        page: 1,
        pageSize: 10
      };
      config.term = this.$route.query.item || "";
      config.direction = this.sort;
      config.page = this.pageInfo.pno;
      config.nationId =
        this.queryData[0] == 0
          ? ""
          : this.selData.countryData[this.queryData[0] - 1].val;
      config.nationCityId =
        this.queryData[1] == -1
          ? ""
          : this.selData.stateData[this.queryData[1]].val;
      config.housePriceType =
        this.queryData[2] == 0
          ? ""
          : this.selData.priceData[this.queryData[2] - 1].label;
      config.homeGoalIds =
        this.queryData[3] == 0
          ? []
          : [this.selData.tarData[this.queryData[3] - 1].val];
      config.categoryIds =
        this.queryData[4] == 0
          ? []
          : [this.selData.type1Data[this.queryData[4] - 1].val];
      config.housingTypes =
        this.queryData[5] == 0
          ? ""
          : this.selData.type2Data[this.queryData[5] - 1].label;
      config.houseType =
        this.queryData[6] == 0
          ? ""
          : this.selData.hCountData[this.queryData[6] - 1].label;
      for (let i in this.queryData[7]) {
        if (this.queryData[7][i] == 1) {
          config.housingFeatureIds.push(this.selData.favData[i].val);
        }
      }

      return config;
    },

    collect(e, id, c, i) {
      e.preventDefault();
      e.stopPropagation();
      if (c) {
        //收藏
        setFavProject(1, id).then(res => {
          if (res.header.code == "000") {
            this.$message({
              type: "success",
              message: "收藏成功"
            });
            this.list[i].clickable = false;
          }
        });
      } else {
        //收藏
        cancelFavProject(id).then(res => {
          if (res.header.code == "000") {
            this.$message({
              type: "success",
              message: "取消收藏成功"
            });
            this.list[i].clickable = true;
          }
        });
      }
    }
  },
  mounted() {
    this.queryData = store.state.app.queryList;

    this.getProCon();

    this.getCity();
  },
  watch: {
    queryData: function() {
      this.pageInfo.pno = 1;
      this.getList();
    },
    $route: function() {
      this.pageInfo.pno = 1;

      if (this.$route.query.hash) {
        this.getList();
        return;
      }

      this.queryData = [
        0, //country
        -1, //state
        0, //price
        0, //tar
        0, //type1
        0, //type2
        0, //hcount
        [0, 0, 0, 0, 0] //tag
      ];
      this.getList();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.radios_box {
  background-color: #f5f5f5;
  width: 100%;
  min-width: 1280px;
  max-width: 1920px;
  padding: 30px 0;
  .main_box {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .filter-reset {
      position: absolute;
      padding: 0 8px;
      line-height: 28px;
      background-color: #e6e6e6;
      cursor: pointer;
      right: 0;
      bottom: 10px;
      img {
        display: inline-block;
        width: 16px;
        height: 17px;
        margin-right: 5px;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        font-size: 12px;
        color: #666;
        vertical-align: middle;
      }
    }

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .container {
      .selitems {
        margin-bottom: 15px;

        .navitem {
          color: #878787;
          font-size: 14px;
          line-height: 1.1;
          vertical-align: top;
          &:after {
            display: inline-block;
            content: ">";
            margin-left: 5px;
            margin-right: 5px;
            color: #878787;
            vertical-align: top;
            cursor: auto;
          }

          &:hover {
            color: #ee5c59;
          }

          &:nth-last-of-type(1):after {
            display: none;
          }
        }

        .sels {
          display: inline-block;
          width: calc(100% - 70px);

          .sel {
            display: inline-block;
            margin-left: 0;
            border: none;
            background-color: transparent;
            font-size: 14px;
            color: #333;
            //margin-right: 20px;
            width: 5.3%;

            text-align: center;
            &:hover,
            &.active {
              color: #ee5c59;
            }

            &.fix {
              margin-right: 35px;
              width: auto;
            }
          }
          .sel-auto {
            width: auto;
            padding: 0 10px;
          }

          .checkbox {
            cursor: pointer;
            &:hover {
              color: #333;
            }
            span {
              vertical-align: top;
            }

            .check_icon {
              display: inline-block;
              width: 14px;
              height: 14px;
              background: url(../../assets/img/custom_checkbox.png) no-repeat;
              vertical-align: top;
            }
            &.active {
              color: #333;
              .check_icon {
                background: url(../../assets/img/custom_checkbox_selected.png)
                  no-repeat;
              }
            }
          }
        }

        .states {
          position: relative;
          margin-top: 10px;
          margin-left: 75px;
          border: 1px dotted #d7d7d7;
          background-color: #fff;
          padding: 8px 15px;

          .sel {
            display: inline-block;
            margin-left: 0;
            border: none;
            background-color: transparent;
            font-size: 14px;
            color: #333;
            //margin-right: 20px;
            width: 5.3%;

            text-align: center;
            &:hover,
            &.active {
              color: #ee5c59;
            }

            &.fix {
              margin-right: 35px;
              width: auto;
            }
          }
        }

        .itemlabel {
          font-weight: 700;
          display: inline-block;
          font-size: 14px;
          color: #333;
          vertical-align: top;
        }
      }
    }
  }
}

.more_box {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  border-top: 1px solid #e6e6e6;
  text-align: center;
  .wrap {
    position: relative;
    border: 1px solid #e6e6e6;
    border-top: none;
    background-color: #f5f5f5;
    margin-left: 0;
    margin-top: 0;
    float: none;
    line-height: 26px;
    padding: 0 15px;
    display: inline-block;
    top: -3px;
    cursor: pointer;
    &:hover {
      span {
        color: black;
      }
    }

    img {
      width: 10px;
      height: 5px;
    }

    span {
      font-size: 12px;
      color: #666;
    }
  }
}

.wrap2 {
  width: 100%;
  min-width: 1280px;
  max-width: 1920px;
  .wrapbox2 {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 250px;
    .filter_container {
      position: relative;
      padding-top: 30px;
      padding-bottom: 0;
      line-height: 48px;
      border-bottom: 2px solid #1683e2;

      .fitem {
        &.active {
          display: inline-block;
          line-height: 48px;
          background-color: #1683e2;
          color: #fff;
          vertical-align: top;
        }
        padding: 0 25px;
        margin-right: 0;
        font-size: 14px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        img {
          display: inline-block;
          width: 9px;
          height: 13px;
          vertical-align: middle;
        }
      }
    }
  }

  .salelist {
    margin: 0 auto;
    padding: 0;
    padding-top: 15px;
    list-style: none;
    .saleitem {
      cursor: pointer;
      margin: 0 auto;
      padding: 10px 0;
      list-style: none;
      position: relative;
      &:hover {
        background-color: #f5f5f5;
      }
      .imgbox {
        display: inline-block;
        vertical-align: top;
        margin-right: 15px;
        width: 241px;
        height: 22vh;
        background-size: cover;
        div:first-child {
          float: right;
          margin-right: 2px;
          margin-top: 2px;
          display: inline-block;
          height: 3vh;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 0 10px;
          border-radius: 10px;
          line-height: 2.5vh;
          font-size: 0.8em;
          img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
            margin-right: 3px;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            box-sizing: border-box;
            /*border:1px solid yellow*/
          }
        }
        .img-sell {
          float: left;
          width: 10px;
          height: 10px;
          border-top: 8vh solid #ee5c59;
          border-right: 8vh solid transparent;
          position: relative;
          font-size: 0.7em;
          span {
            position: absolute;
            text-align: center;
            top: -6.3vh;
            left: -1.2vh;
            font-size: 0.9em;
            /*border:1px solid red;*/
            width: 8vh;
            color: #fff;
            transform: rotate(-45deg);
          }
        }
      }
      .contentbox {
        display: inline-block;
        vertical-align: top;

        .title {
          font-size: 1.17em;
          font-weight: bold;
        }
        .detailbox,
        .connect_box {
          color: #666;
          font-size: 15px;
          margin-top: 30px;
          .item {
            margin-top: 16px;
            &:nth-of-type(1) {
              margin-top: 0;
            }
          }
        }

        .connect_box {
          position: absolute;
          top: 35px;
          right: 10px;

          .item {
            text-align: right;
            .price {
              color: #f2378e;
              font-size: 27px;
              letter-spacing: -1px;
            }
            .connectbtn {
              background-color: #f23644;
              color: white;
              padding: 9px;
              border-radius: 5px;
              margin-right: 7px;
            }
            .collectbtn {
              width: 100px;
              height: 25px;
              text-align: center;
              display: block;
              background-color: #f23644;
              line-height: 25px;
              color: white;
              border-radius: 3px;
              margin-top: 10px;
              cursor: pointer;
              float: right;

              &.disabled {
                background-color: #999;
              }
            }
          }
        }
      }
    }
  }
}
</style>
