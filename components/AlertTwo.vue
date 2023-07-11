<template>
  <div class="text-center">
    <v-dialog v-model="showDialog" max-width="450">
      <v-card>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-toolbar-title style="text-transform: capitalize" class="text-h7 red--text justify-center">{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items> -->
          <v-btn fab outlined x-small color="red">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider></v-divider>
        <v-card-text class="py-11 text-center">
          <p style="font-size: 18px; padding-left: 80px; padding-right: 80px;" class="mt-4">{{message}}</p>

          <div class="mt-10">
            <v-btn style="text-transform: capitalize" outlined large class="mr-2" color="#808080" width="150px" @click="onCancel">{{cancelText}}</v-btn>
            <v-btn style="text-transform: capitalize" color="primary" dark width="150px" large @click="onConfirm">{{confirmText}}</v-btn>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <div
          style="height: 35px; background-color: rgba(41, 42, 45, 0.11)"
        ></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isDialogOpen: {
      type: Boolean,
      default: false
    },
    
    title: {
      type: String,
      default: "DELETE"
    },
    message: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: "Yes"
    },
    cancelText: {
      type: String,
      default: "No"
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    onDialogShow: {
      type: Function,
      default: () => {
        alert('wtdx')
      }
    }
  },

  computed: {
    showDialog :{
      get() {
        return this.isDialogOpen
      },
      set(value) {
        this.$emit('close', value)
      }
    }
  },

}
</script>

<style scoped>
</style>