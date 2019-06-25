<template>
  <div>
    <header class="header-fixed">
      <div class="header-limiter">
        <h1><a href="#">Vue<span>project</span></a></h1>
        <nav>
          <a href="#" @click.prevent="deleteAccount">Delete</a>
          <a href="#" @click.prevent="logout">logout</a>
        </nav>
      </div>
    </header>
    <div class="my-account-area">
      <div class="profile-image-area">
        <img src="https://mrright.blob.core.windows.net/cdn/content/assets/2015-11/small/a9e417d2084e4aa1b36524ae4ba573db-%20.jpg" class="profile-img ">
      </div>
      <div class="display-area" v-for="(value, index) in $store.getters.getLoginedUserData">
        <h3>{{index}}</h3>
        <label> {{value}} </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Account',
    data: () => ({
    }),
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if(fieldName == "email") {
          return {
            'md-invalid': (field.$invalid && field.$dirty) || !this.emailExist 
          }
        } else if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty 
          }
        }
      },
      logout () {
        this.$store.commit('logout');
        this.$router.push({ name: 'Login'});
      },
      deleteAccount () {
        if(confirm("Are you sure delete this account?")){
          this.$store.commit('deleteAccount');
          this.$router.push({ name: 'Register'});
        }
      }
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
  .header-fixed {
    background-color:#292c2f;
    box-shadow:0 1px 1px #ccc;
    padding: 20px 40px;
    height: 80px;
    color: #ffffff;
    box-sizing: border-box;
    top:-100px;

    -webkit-transition:top 0.3s;
    transition:top 0.3s;
  }
  .header-fixed .header-limiter {
    max-width: 1200px;
    text-align: center;
    margin: 0 auto;
  }
  .header-fixed-placeholder{
    height: 80px;
    display: none;
  }
  .header-fixed .header-limiter h1 {
    float: left;
    font: normal 28px Cookie, Arial, Helvetica, sans-serif;
    line-height: 40px;
    margin: 0;
  }
  .header-fixed .header-limiter h1 span {
    color: #5383d3;
  }
  .header-fixed .header-limiter a {
    color: #ffffff;
    text-decoration: none;
  }
  .header-fixed .header-limiter nav {
    font:16px Arial, Helvetica, sans-serif;
    line-height: 40px;
    float: right;
  }
  .header-fixed .header-limiter nav a{
    display: inline-block;
    padding: 0 5px;
    text-decoration:none;
    color: #ffffff;
    opacity: 0.9;
  }
  .header-fixed .header-limiter nav a:hover{
    opacity: 1;
  }
  .header-fixed .header-limiter nav a.selected {
    color: #608bd2;
    pointer-events: none;
    opacity: 1;
  }
  body.fixed .header-fixed {
    padding: 10px 40px;
    height: 50px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  body.fixed .header-fixed-placeholder {
    display: block;
  }
  body.fixed .header-fixed .header-limiter h1 {
    font-size: 24px;
    line-height: 30px;
  }
  body.fixed .header-fixed .header-limiter nav {
    line-height: 28px;
    font-size: 13px;
  }
  @media all and (max-width: 600px) {
    .header-fixed {
      padding: 20px 0;
      height: 75px;
    }
    .header-fixed .header-limiter h1 {
      float: none;
      margin: -8px 0 10px;
      text-align: center;
      font-size: 24px;
      line-height: 1;
    }
    .header-fixed .header-limiter nav {
      line-height: 1;
      float:none;
    }
    .header-fixed .header-limiter nav a {
      font-size: 13px;
    }
    body.fixed .header-fixed {
      display: none;
    }
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