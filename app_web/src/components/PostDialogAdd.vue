<template>
  <div class="text-center">
    <v-dialog v-model="dialogAdd" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue" v-bind="attrs" v-on="on" fab small dark>
          <v-icon small>add</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="blue lighten-1 white--text">
          Add Post
        </v-card-title>
        <v-card-text>
          <v-form class="pa-6">
            <v-text-field
              v-model="post.title"
              label="Title"
              placeholder="Placeholder"
              clearable
            ></v-text-field>
            <v-textarea
              v-model="post.message"
              filled
              auto-grow
              label="Message"
              placeholder="Placeholder"
              clearable
            ></v-textarea>
            <!-- <v-text-field
              v-model="post.author"
              label="Author"
              placeholder="Placeholder"
              readonly
            ></v-text-field>
            <v-text-field
              :value ="post.datetime | toDateTime"
              label="Date"
              placeholder="Placeholder"
              readonly
            ></v-text-field> -->

            <v-radio-group mandatory row v-model="post.type">
              Types :
              <v-radio label="Announcement" value="announcement"></v-radio>
              <v-radio label="Article" value="article"></v-radio>
              <v-radio label="Question" value="question"></v-radio>
            </v-radio-group>
            <v-radio-group mandatory row v-model="post.status">
              Status :
              <v-radio label="Done" value="done"></v-radio>
              <v-radio label="Suspended" value="suspended"></v-radio>
              <v-radio label="Ongoing" value="ongoing"></v-radio>
              <v-radio label="Overdue" value="overdue"></v-radio>
            </v-radio-group>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="postAdd()"> Add </v-btn>
          <v-btn color="primary" text @click="dialogAdd = false"> Cancel </v-btn>
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
    this.post.author = firebase.auth().currentUser.email
    this.post.datetime = new Date().getTime()
  },
  props: {
    method : { type: Function}
  },
  data() {
    return {
      dialogAdd: false,
      user: null,
      post : {}
    };
  },
  methods: {
    close() {
        this.dialogAdd = false
        this.method()
    },
    postAdd() {
      firestore
      .collection("posts")
      .add(this.post)
      .then(function(doc) {
        this.post = {}
        console.log("Document written with ID: ", doc.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.close()
    }
  }
};
</script>