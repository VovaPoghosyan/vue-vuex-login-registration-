<template>
  <div>
    <HeaderSimple></HeaderSimple>
    <form novalidate class="md-layout register-form" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 register-card">
        <md-card-header>
          <div class="md-title">Edit Account</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Gender</label>
                <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="M">Mail</md-option>
                  <md-option value="F">Famail</md-option>
                </md-select>
                <span class="md-error">The gender is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('age')">
                <label for="age">Age</label>
                <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.age.required">The age is required</span>
                <span class="md-error" v-else-if="!$v.form.age.maxlength">Invalid age</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            <span class="md-error" v-else-if="emailExist">This email is already exists</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" autocomplete="password" ref="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.form.password.maxlength">The password must be at least 6 characters</span>
          </md-field>
          <div class="my-8">
            <img :src="form.avatar.dataUrl" v-if="form.avatar != null && hasImage == false" alt="">
            <image-uploader
              :preview="true"
              :className="['fileinput', { 'fileinput--loaded': hasImage }]"
              capture="environment"
              :debug="1"
              doNotResize="gif"
              :autoRotate="true"
              outputFormat="verbose"
              @input="setImage"
            >
              <label for="fileInput" slot="upload-label">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path class="path1"></path>
                  </svg>
                </figure>
                <span class="upload-caption">{{
                  hasImage ? "Replace" : "Click to upload"
                }}</span>
              </label>
            </image-uploader>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Edit</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
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
    name: 'EditAccount',
    mixins: [validationMixin],
    computed: {
      emailExist: function () {
        return this.$store.getters.emailExistEdit(this.form.email);
      }
    },
    data: () => ({
      form: {
        firstName: null,
        lastName:  null,
        gender:    null,
        age:       null,
        email:     null,
        password:  null,
        avatar:    null,
      },
      hasImage: false,
      image: null,
      userSaved: false,
      sending:   false,
      lastUser:  null,
    }),
    components: {
      HeaderSimple
    },
    created: function () {
      let data         = this.$store.getters.getLoginedUserData;
      this.form        = data.info;
      this.form.gender = this.form.gender == "Mail" ? "M" : "F";
      this.form.avatar = data.avatar;
    },
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        gender: {
          required
        },
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
            'md-invalid': (field.$invalid && field.$dirty) || this.emailExist 
          }
        } else if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty 
          }
        }
      },
      clearForm () {
        this.$v.$reset();
        this.form.firstName = null;
        this.form.lastName  = null;
        this.form.age       = null;
        this.form.gender    = null;
        this.form.email     = null;
        this.form.password  = null;
        this.form.avatar  = null;
      },
      saveUser () {
        if(!this.emailExist) {
          this.sending = true;
          window.setTimeout(() => {
            this.lastUser  = `${this.form.firstName} ${this.form.lastName}`;
            this.userSaved = true;
            this.sending   = false;
            let user = {
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              email: this.form.email,
              gender: this.form.gender,
              age: this.form.age,
              password: this.form.password,
              avatar: this.form.avatar
            };
            this.$store.commit('editUser', user);
            // this.clearForm();
            this.$router.push({ name: 'Account'});
          }, 1000)
        } 
      },
      validateUser (id = null) {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.saveUser();
        }
      },
      setImage: function(output) {
        this.hasImage = true;
        this.image = output;
        this.form.avatar = this.image;
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
  #fileInput {
  display: none;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>