<template>
  <v-app>
    <v-container fluid fill-height>
      <v-row class="justify-center">
        <v-col cols="12" md="3">
          <div class="text-center">
            <v-img
              @click="onLogoClick"
              :max-height="$vuetify.breakpoint.smAndDown ? '60' : '80'"
              max-width="200"
              :src="require('@/assets/img/twoguysapplogo.svg')"
              contain
              class="mx-auto mb-12"
              style="cursor: pointer"
            ></v-img>
            <div class="font-bold">Change your password</div>

            <v-card
              v-if="showErrorMessage"
              outlined
              color="#F4433666"
              class="pa-4 my-4 d-flex text-subtitle-2"
              style="border: 1px solid red"
            >
              <div class="text-left">
                Sorry, Password reset link is invalid or expired.
              </div>
              <div>
                <v-btn icon class="mt-n2" @click="onReturnSigninClick"><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </v-card>

            <v-card v-if="showResetPassword" class="pa-4 mt-6" outlined>
              <div class="mb-4 text-left text-subtitle-2">
                Enter your new password
              </div>

              <v-text-field
                :rules="[rules.required]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                outlined
                dense
                v-model="password"
              ></v-text-field>

               <div class="mb-4 text-left text-subtitle-2">
                Re-enter your new password to confirm
              </div>

              <v-text-field
                :rules="[rules.required]"
                :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPasswordConfirm ? 'text' : 'password'"
                @click:append="showPasswordConfirm = !showPasswordConfirm"
                outlined
                dense
                v-model="passwordConfirm"
              ></v-text-field>

              <v-btn color="green" dark large class="mt-4" @click="onChangePasswordClick"
                >Change password</v-btn
              >
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-footer padless color="primary" min-height="30px" dark>
      <v-container>
        <div class="text-center">
          Unsubscribe / © twoguys.app All rights reserved
        </div>
      </v-container>
    </v-footer> -->
  </v-app>
</template>

<router lang="yaml">
    path: /change-password
    name: change-password
</router>
<script>
export default {
  layout: "nolayout",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
      },
      password: null,
      passwordConfirm: null,
      showPassword: false,
      showPasswordConfirm: false,
      showResetPassword: true,
      showErrorMessage: false,
      disableChangePassword: false
    }
  },

  methods: {
    onLogoClick(){
      this.$router.push({
        path: this.localePath("/"),
      })
    },
    
    onReturnSigninClick(){
      this.$router.push({
        path: this.localePath("/login"),
      })
    },

    async onChangePasswordClick(){
      if(this.password === null || this.passwordConfirm  === null){
        return
      }

      if(this.password !== this.passwordConfirm){
        this.$toast({
          icon: "error",
          title: "Confirm password doesn't match",
        })
        return
      }

      if(this.disableChangePassword){
        return
      }

      this.$nuxt.$loading.start()

      this.disableChangePassword = true
      this.showErrorMessage = false
      
      this.$axios.$post('/user/change-password', {
        customer_id: this.$route.query.id,
        token: this.$route.query.token,
        password: this.password
      }).then(async(response) => {
        console.info(response)

        if(!response.success){
          this.showErrorMessage = true
          return
        }

        this.$toast({
          icon: "success",
          title: "Password successfully change",
        })

        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.$router.push({
          path: this.localePath('/login')
        })

      }).finally(() => {
        this.$nuxt.$loading.finish()
        this.disableChangePassword = false
      })
    }
  },

};
</script>

<style>
.font-bold {
  font-family: "Nunito-Bold", sans-serif !important;
  font-size: 24px;
}
</style>
