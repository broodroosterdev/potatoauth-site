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
          <v-card-title>Reset your password</v-card-title>
          <v-text-field
            v-model="username"
            label="Username/Email"
            outlined
          ></v-text-field>
          <v-btn
          v-on:click="sendPasswordReset()">Send password reset</v-btn>
      </v-form>
      </v-sheet>
    </v-col>
    </v-row>
</template>

<script>
import UserService from '../services/userservice'
export default {
    auth: false,
    data () {
        return {
            username: '',
            success: null,
            error: null
        }
    },
    methods: {
        async sendPasswordReset() {
            try {
                if(this.username.length > 0){
                    let result = await UserService.sendPasswordReset(this.username);
                    if(result.statusCode == 200){
                        this.error = null;
                        this.success = 'Sent a password reset link';
                    } else {
                        this.success = null;
                        this.error = `Could not send a password reset link: ${await result.text()}`;
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>

<style>
</style>