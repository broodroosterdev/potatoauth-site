<template>
  <v-row>
    <v-col>
      <v-sheet class="rounded-lg outlined" outlined>
        <v-simple-table class="pa-4 rounded-lg">
          <tbody>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
          >
            <template v-slot:activator="{ on, attrs }">
              <tr v-bind="attrs" v-on="on" class="row-pointer">
                <td class="text--secondary text-caption text-uppercase py-6">Picture</td>
                <td>Personalize your account with a profile picture</td>
                <td align="right">
                  <v-avatar>
                    <img v-bind:src="avatarURL"
                      alt="John"
                    >
                  </v-avatar>
                </td>
              </tr>
            </template>
            <v-card>
              <v-card-title class="headline">
                Select profile picture
              </v-card-title>
              <v-card-text>Upload an image to use it as your profile picture
                <v-file-input
                  accept="image/*"
                  class="mt-6"
                  truncate-length="30"
                  @change="onFilePicked"
                ></v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="deleteAvatar"
                >
                  Delete
                </v-btn>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="upload"
                >
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <tr>
            <td class="text--secondary text-caption text-uppercase">Username</td>
            <td>{{ loggedInUser.username }}</td>
            <td align="right">
            </td>
          </tr>
          <tr>
            <td class="text--secondary text-caption text-uppercase">Role</td>
            <td>{{ loggedInUser.role }}</td>
            <td align="right">
            </td>
          </tr>
          <tr class="row-pointer">
            <td class="text--secondary text-caption text-uppercase">E-Mail</td>
            <td>{{ loggedInUser.email }}</td>
            <td align="right">
              <v-icon>mdi-chevron-right</v-icon>
            </td>
          </tr>

          <tr class="row-pointer">
            <td class="text--secondary text-caption text-uppercase">Password</td>
            <td>••••••••</td>
            <td align="right">
              <v-icon>mdi-chevron-right</v-icon>
            </td>
          </tr>
          <tr class="row-pointer">
          <v-btn v-on:click.native="logout()">Logout</v-btn>
          </tr>
          </tbody>
        </v-simple-table>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarService from '../services/avatarservice'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  components: {},
  data() {
    return {
      dialog: false,
      avatarURL: null,
      image: null
    }
  },
  methods: {
    async logout(){
      await this.$auth.logout();
    },

    onFilePicked(file) {
      this.image = file;
      console.log(file);
    },
    upload(){
      if(!this.image){
        return;
      }
      console.log('uploading');
      AvatarService.upload(this.image, this.$auth.strategy.token.get()).then(
        () => {
          this.updateAvatar();
          this.dialog = false;
        }
      );
    },
    async updateAvatar(){
      const response = await fetch('https://sync.broodrooster.dev/api/v2/files/get/avatar.jpg', {
        headers: {
          'Authorization': this.$auth.strategy.token.get()
        },
      })
      if(response.status == 200){
        this.avatarURL = await response.text();
      }
    },
    deleteAvatar(){
      AvatarService.delete(this.$auth.strategy.token.get()).then(
        () => {
          this.avatarURL = null;
          this.dialog = false;
        }
      )
    }
  },
  created() {
      this.updateAvatar();
  }
}
</script>

<style>
.row-pointer:hover {
  cursor: pointer;
}
</style>
