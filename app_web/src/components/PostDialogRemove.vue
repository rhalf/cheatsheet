<template>
  <div class="text-center">
    <v-dialog v-model="dialogRemove" width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" v-bind="attrs" v-on="on" fab small dark>
          <v-icon small>delete</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="blue lighten-1 white--text">
          Remove Post
        </v-card-title>
        <v-card-text>
          <v-sheet class="pa-6">
            Are you sure you want to remove a post with a title of " {{
              post.title
            }}"
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="postRemove()"> Yes </v-btn>
          <v-btn color="primary" text @click="dialogRemove = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "../plugins/firebase";
var firestore = firebase.firestore();

export default {
  created() {
     if ( this.post.author != firebase.auth().currentUser.email) {
      this.snackbar.message = "You cannot edit post's you didn't create!";
      this.snackbar.state = "error";
      this.snackbar.show = true;
      this.dialogRemove = false
    }
  },
  props: {
    method: Function,
    post: Object,
    snackbar: Object
  },
  data() {
    return {
      dialogRemove: false,
      user: null,
    };
  },
  methods: {
    close() {
      this.dialogRemove = false;
      this.method();
    },
    postRemove() {
      firestore
      .collection("posts")
      .doc(this.post.id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
      this.close()
    },
  },
};
</script>