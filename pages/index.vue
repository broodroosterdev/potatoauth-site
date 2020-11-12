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
                    <img
                      src="https://avatars.githubusercontent.com/u/23036430"
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
                  @click="dialog = false"
                >
                  Delete
                </v-btn>
                <v-btn
                  color="primary darken-1"
                  text
                  @click="dialog = false"
                >
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <tr>
            <td class="text--secondary text-caption text-uppercase">Username</td>
            <td>ZerNico</td>
            <td align="right">
            </td>
          </tr>
          <tr>
            <td class="text--secondary text-caption text-uppercase">Role</td>
            <td>User</td>
            <td align="right">
            </td>
          </tr>
          <tr class="row-pointer">
            <td class="text--secondary text-caption text-uppercase">E-Mail</td>
            <td>steve@minecraft.com</td>
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
          </tbody>
        </v-simple-table>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      dialog: false,
    }
  }
}
</script>

<style>
.row-pointer:hover {
  cursor: pointer;
}
</style>
