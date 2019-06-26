<template>
  <div>
    <HeaderSimple></HeaderSimple>
    <form novalidate class="md-layout login-form" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 login-card">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            <span class="md-error" v-else-if="!emailExist">The mail is not registered properly</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" autocomplete="password" ref="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.form.password.maxlength">The password must be at least 6 characters</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import HeaderSimple from '@/components/HeaderSimple'

  export default {
    name:   'Login',
    mixins: [validationMixin],
    computed: {
      emailExist: function () {
        return this.$store.getters.emailExist(this.form.email);
      }
    },
    data: () => ({
      form: {
        email:    null,
        password: null,
      },
      userSaved: false,
      sending:   false,
    }),
    components: {
      HeaderSimple
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        },
      }
    },
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
      clearForm () {
        this.$v.$reset()
        this.form.email    = null
        this.form.password = null
      },
      login () {
        if(this.emailExist) {
          this.sending = true;
          window.setTimeout(() => {
            this.userSaved = true;
            this.sending   = false;
            let user = {
              email: this.form.email,
              password: this.form.password
            };
            let data = this.$store.getters.login(user);
            if(data.status == "success") {
              this.clearForm();
              this.$store.commit('saveUserId', data.userId);
              this.$router.push({ name: 'Account'});
            }
          }, 1000)
        } 
      },
      validateUser (id = null) {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.login();
        }
      },
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
</style>