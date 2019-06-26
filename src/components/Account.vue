<template>
  <div>
    <HeaderSimple></HeaderSimple>
    <div class="my-account-area">
      <div class="profile-image-area">
        <img :src="userData.avatar.dataUrl" v-if="userData.avatar != null" class="profile-img ">
        <img src="../assets/avatar.jpg" v-else class="profile-img ">
      </div>
      <div class="display-area" v-for="(value, index) in userData.info">
        <h3>{{index}}</h3>
        <img :src="value" v-if="index == 'avatar'" alt="">
        <label v-else> {{value}} </label>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSimple from '@/components/HeaderSimple'

  export default {
    name: 'Account',
    data: () => ({
      userData: null
    }),
    created: function () {
      this.userData = this.$store.getters.getLoginedUserData;      
      console.log("TCL: created---------", this.userData)
    },
    components: {
      HeaderSimple
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top:   0;
    right: 0;
    left:  0;
  }
  .md-card {
    margin: 0 auto;
  }
  .content {
    margin: 60px 0;
  }
  body {
    background-color: #fafafa;
    margin: 0;
    padding: 0;
    height: 1500px;
  }

  .profile-image-area {
    margin: auto;
    text-align: center;
}
.profile-img {
  height:140px;
  border-radius:90px;
  padding:20px;
  text-align:center;
  margin:auto;
}
h3 {
  font-size:16px;
  margin-bottom:2px;
}
label {
  font-size:14px;
  font-weight:600;
  color:#777;
}
.display-area {
  padding:16px 0px;
  border-bottom:1px solid #ddd;
}
.display-area:nth-child(2) {
   border-top:1px solid #ddd;
}
.my-account-area {
  padding: 50px;
  max-width: 300px;
}
</style>