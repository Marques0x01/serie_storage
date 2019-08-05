<template>
    <v-app>
        <router-view />
    </v-app>
</template>

<script>
const firebase = require('./config/firebaseConfig')

export default {
    name: "App",
    created() {
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.$store.commit("setCurrentUser", { user: user });
                this.$store.dispatch("fetchUserProfile");
            }
        });
    }
};
</script>

