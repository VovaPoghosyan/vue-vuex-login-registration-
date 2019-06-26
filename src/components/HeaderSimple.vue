<template>
    <header class="header-fixed">
      <div class="header-limiter">
        <h1>
          <router-link :to="{ name: 'Account'}">
            Vue<span>project</span>
          </router-link>
        </h1>
        <nav v-if="$store.getters.userId == null">
          <router-link :to="{ name: 'Login'}">
            login
          </router-link>
          <router-link :to="{ name: 'Register'}">
            Register
          </router-link>
        </nav>
        <nav v-else>
          <a href="#" @click.prevent="deleteAccount">Delete</a>
          <router-link :to="{ name: 'EditAccount'}">
            Edit Account
          </router-link>
          <a href="#" @click.prevent="logout">logout</a>
        </nav>
      </div>
    </header>
</template>

<script>
  export default {
    name: 'HeaderSimple',
    data: () => ({
    }),
    methods: {
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
    padding: 0 15px;
    text-decoration:none;
    color: #ffffff;
    opacity: 0.9;
  }
  .header-fixed .header-limiter nav a:hover{
    background: #2f2f2fcc;;
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
</style>