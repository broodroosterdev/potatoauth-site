<template>
<v-row>
    <v-col>
      <v-sheet class="rounded-lg outlined">
      <v-form>
          <v-card-title>Login</v-card-title>
          <v-text-field
            v-model="username"
            label="Username/Email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            class="input-group--focused"
            @click:append="show_password = !show_password"
            outlined
          ></v-text-field>
          <v-btn
          v-on:click="login()">Login</v-btn>
      </v-form>
      </v-sheet>
    </v-col>
    </v-row>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: '',
            show_password: false,
            submitted: false
        }
    },
    methods: {
        async login() {
            try {
            let response = await this.$auth.loginWith('local', { data: {username: this.username, password: this.password} })
            this.$router.push('/')
        } catch (err) {
            console.log(err)
        }
        }
    }
}
</script>

<style>
</style>