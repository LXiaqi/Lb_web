<template>
  <div @click="goPage('http://download.51liaobei.com')">
    <div class="content">
      <!-- 头部信息 -->
      <div style="margin-top:8px">
        <div class="left">
          <img class="position" src="../assets/position.png" alt />
          <span>{{citys}}</span>
        </div>
        <div class="right">
          <img src="../assets/authentication.png" alt />
          <span>实名认证</span>
        </div>
      </div>
      <!-- 推荐达人 -->
      <div>
        <div class="tit_box">
          <img class="img" src="../assets/recommend.png" alt />
          <span class="span">推荐达人</span>
        </div>
        <div class="img_box">
          <div class="recomend_box" v-for="res in recommendList" :key="res.id">
            <img class="recomend_img1" :src="res.coverPhoto" alt />
            <img class="recomend_img2" src="../assets/dian.png" alt />
          </div>
        </div>
      </div>
      <!-- 附近达人 -->
      <div style="margin-top:20px">
        <div>
          <img class="img" src="../assets/nearby.png" alt />
          <span class="span">附近达人</span>
        </div>
        <div style="margin-top:16px">
          <ul>
            <li
              @click="label_change(list.id)"
              :class="list.id == changeid ? 'li_change' : 'li'"
              v-for="list in label_List"
              :key="list.id"
            >{{list.iconName}}</li>
          </ul>
        </div>

        <div style="margin-top:14px">
          <div v-for="res in beautyList" :key="res.index" class="photo_box">
            <img class="photo" :src="res.coverPhoto" alt />
            <span class="name">{{res.nickname}}</span>
            <div class="age_box">
              <img src="../assets/man.png" alt />
              <span>{{res.age}}</span>
            </div>
            <span
              :class="res.certificationCode == '1' ? 'people_yes' : ''"
            >{{res.certificationCode == '1' ? '本人' : ''}}</span>
            <span class="label_span">{{res.label.iconName}}</span>
            <div class="km">
              <img src="../assets/dian.png" alt />
              <span>{{res.distance}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部导航 -->
    </div>
    <div class="bottom_nav">
      <div class="nav_box">
        <img src="../assets/tab_near_selected.png" alt />
        <p class="red_nav">附近</p>
      </div>
      <div class="nav_box">
        <img src="../assets/tab_liaobei_normal.png" alt />
        <p>撩呗</p>
      </div>
      <div class="nav_box">
        <img src="../assets/tab_message_normal.png" alt />
        <p>消息</p>
      </div>
      <div class="nav_box">
        <img src="../assets/tab_mine_normal.png" alt />
        <p>我的</p>
      </div>
    </div>
  </div>
</template>

<script>
import { recommend, getLabels, nearby } from "@/api/hemo";
export default {
  data() {
    return {
      lng: "",
      lat: "",
      recommendList: {},
      citys: "",
      gender: "0",
      labelType: "0",
      label_List: [],
      changeid: "",
      beautyList: []
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    info() {
      const that = this;
      recommend(that).then(res => {
        that.recommendList = res.data.data;
        that.labelList();
      });
    },

    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位成功信息：", data);
          self.getLngLatLocation();
        }

        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用ip定位
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      const that = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            that.citys = result.city;
            that.lat = result.bounds.eb.lat;
            that.lng = result.bounds.eb.lng;
            that.info();
          }
        });
      });
    },

    //标签信息
    labelList() {
      const that = this;
      getLabels(that).then(res => {
        that.label_List = res.data.data;
        that.changeid = res.data.data[0].id;
        console.log(that.label_List);
        that.nearbyList();
      });
    },

    label_change(id) {
      this.changeid = id;
      this.nearbyList();
    },
    nearbyList() {
      const that = this;
      nearby(that).then(res => {
        console.log(res.data.data.list);
        that.beautyList = res.data.data.list;
      });
    },
    goPage (url) {
            window.location.href = url
    }
  }
};
</script>

<style scoped>
.content {
  font-size: 14px;
  padding: 10px;
}
.position {
  width: 10px;
  height: 14px;
}
.img {
  width: 20px;
  height: 20px;
}
.span {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(18, 18, 18, 1);
  margin-left: 4px;
}

.left {
  display: inline-block;
}
.right {
  display: inline-block;
  width: 94px;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 25, 106, 1);
  text-align: center;
  border-radius: 32px;
  margin-left: 55%;
}
.right img {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
.right span {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
}
.recomend_box {
  display: inline-block;
  margin: 14px 10px;
  position: relative;
}
.recomend_img1 {
  width: 45px;
  height: 45px;
  background: rgba(216, 216, 216, 1);
  border-radius: 50%;
}
.recomend_img2 {
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 2px;
  right: 2px;
}
.img_box {
  width: 100%;
  justify-content: space-between;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.tit_box {
  margin: 23px 0px 10px;
}
.li {
  display: inline-block;
  width: 81px;
  height: 36px;
  background: rgba(249, 249, 249, 1);
  border-radius: 18px;
  text-align: center;
  line-height: 36px;
  margin-left: 6px;
  font-size: 12px;
}

.li_change {
  display: inline-block;
  width: 81px;
  height: 36px;
  background: linear-gradient(
    270deg,
    rgba(26, 152, 228, 1) 0%,
    rgba(41, 198, 194, 1) 100%
  );
  border-radius: 18px;
  text-align: center;
  line-height: 36px;
  margin-left: 6px;
  font-size: 12px;
  color: #fff;
}
.photo_box {
  width: 168px;
  height: 200px;
  float: left;
  margin: 4px;
  position: relative;
}
.name {
  position: absolute;
  bottom: 24px;
  left: 10px;
  color: #fff;
  font-size: 12px;
}
.photo {
  width: 168px;
  height: 200px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  border-radius: 10px;
}
.age_box {
  width: 32px;
  height: 16px;
  font-size: 12px;
  background: #ff5887;
  border-radius: 10px;
  line-height: 16px;
  text-align: center;
  color: #fff;
  position: absolute;
  bottom: 24px;
  left: 68px;
}
.age_box img {
  width: 8px;
  height: 8px;
}
.people_yes {
  width: 32px;
  height: 16px;
  color: #fff;
  background: #5a1cff;
  border-radius: 10px;
  position: absolute;
  bottom: 24px;
  right: 30px;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
}
.label_span {
  width: 39px;
  height: 14px;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  bottom: 6px;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  left: 10px;
  border: 1px solid #00efff;
  color: #00efff;
}
.km {
  width: 70px;
  height: 20px;
  font-size: 12px;
  position: absolute;
  top: 6px;
  right: 6px;
  color: #fff;
  background: #000;
  opacity: 0.6;
  line-height: 20px;
  border-radius: 8px;
  text-align: center;
}
.km img {
  width: 6px;
  height: 6px;
}

.bottom_nav {
  position: fixed;
  bottom: 0px;
  height: 52px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
}
.nav_box {
  display: inline-block;
  width: 22%;
  text-align: center;
  line-height: 26px;
}
.nav_box img {
  width: 18px;
  height: 13px;
}
.nav_box p {
  margin: 0;
  padding: 0;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.red_nav {
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 25, 106, 1);
}
</style>