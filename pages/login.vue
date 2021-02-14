<template>
<v-row>
    <v-col>
    <v-alert type="success" dismissible v-if="success != null">
        {{ success }}
    </v-alert>
    <v-alert type="error" dismissible v-if="error != null">
        {{ error }}
    </v-alert>
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
          <v-btn v-on:click="passwordReset()">Forgot your password?</v-btn>
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
            submitted: false,
            success: null,
            error: null
        }
    },
    methods: {
        async login() {
            try {
                let response = await this.$auth.loginWith('local', { data: {username: this.username, password: this.password} })
            } catch (err) {
                if(err.response.data['username'] != null){
                    if(err.response.data['username'] != 0){
                        this.error = this.matchCode(err.response.data['username'], 'Username');
                        return;
                    }
                    if(err.response.data['email'] != 0){
                        this.error = this.matchCode(err.response.data['email'], 'Email');
                        return;
                    }
                    if(err.response.data['password'] != 0){
                        this.error = this.matchCode(err.response.data['password'], 'Password')
                        return;
                    }
                } else {
                    this.error = this.toNormalText(err.response.data);       
                }
            }
        },
        matchCode(code, field) {
           switch(code){
               case 1: return `${field} is too short`
               case 2: return `${field} is too long`
               case 3: return `${field} is invalid`
               case 4: return `${field} already exists`
               case 5: return `${field} is missing`
           }
        },
        toNormalText(code){
            let text = code.toLowerCase();
            text = text.replace('_', ' ');
            text = text.charAt(0).toUpperCase() + text.slice(1);
            return text;
        },
        passwordReset(){
            this.$router.push('password-forgotten');
        }
    }
}
</script>

<style>
</style>