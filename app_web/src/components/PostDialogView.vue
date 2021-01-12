<template>
  <div class="text-center">
    <v-dialog v-model="dialogView" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn  color="green" dark v-bind="attrs" v-on="on" fab small>
          <v-icon small>mdi-folder-open</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="blue lighten-1 white--text" >
          {{ post.title }}
        </v-card-title>
        <v-card-subtitle class="blue lighten-1 white--text" >
          {{ post.author }} | {{ post.datetime  | toDateTime}}
        </v-card-subtitle>
        <v-card-text class="py-6">
         {{post.message}}
        
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogView = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
   post: Object
  },
  data() {
    return {
      dialogView: false,
    };
  },
};
</script>