<template>
  <v-snackbar v-model="$store.getters.notify.visible" :color="$store.getters.notify.status"
    >{{ $store.getters.notify.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="close">Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$store.dispatch("notifyClose");
    },
  }
};
</script>