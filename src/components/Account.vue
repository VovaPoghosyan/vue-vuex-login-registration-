<template>
  <ul>
    <li v-for="(value, index) in $store.getters.getLoginedUserData">
      <h3>{{index}}: {{value}}</h3>
    </li>
    <button class="md-button md-primary md-theme-default" @click.prevent="logout">Logout</button>
  </ul>
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
        
      },
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .md-card {
    margin: 0 auto;
  }
  .content {
    margin: 60px 0;
  }
</style>