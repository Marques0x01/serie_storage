<template>
    <nav id="toolbar">
        <v-toolbar flat dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="toogleDrawer" />
            <v-layout>
                <v-layout align-center @click="$router.push('/')" style="cursor: pointer">
                    <v-img
                        :src="require('@/assets/logo.jpeg')"
                        height="40"
                        width="40"
                        max-width="40"
                        style="border-radius: 30px"
                    />
                    <v-toolbar-title>Work Front-End</v-toolbar-title>
                </v-layout>
                <v-spacer />
                <v-text-field
                    append-icon="search"
                    flat
                    hide-details
                    solo-inverted
                    style="max-width: 300px;"
                    class="align-center"
                />
                <v-btn
                    class="ml-0 hidden-sm-and-down"
                    flat
                    left
                    v-for="(option,key) in options"
                    :key="key"
                >
                    <v-icon left size="35">{{option.icon}}</v-icon>
                    <span class="subheading font-weight-bold">{{option.title}}</span>
                </v-btn>
                <v-btn class="ml-0 hidden-sm-and-down" flat left>
                    <v-icon left size="35">account_circle</v-icon>
                    <span class="subheading font-weight-bold">{{userProfile.name}}</span>
                </v-btn>
                <v-btn class="ml-0 hidden-sm-and-down" flat left @click="onLogout()">
                    <v-icon left size="35">account_circle</v-icon>
                    <span class="subheading font-weight-bold">Logout</span>
                </v-btn>
            </v-layout>
        </v-toolbar>
        <Drawer />
        <LoadingDialog :title="'Exiting Account'" />
    </nav>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
    name: "Toolbar",
    data() {
        return {
            options: [
                { icon: "info", title: "About", link: "/" },
                { icon: "email", title: "Contact Us", link: "/" }
            ]
        };
    },
    methods: {
        ...mapMutations(["toogleDrawer"]),
        onLogout() {
            this.$store.dispatch("logout");
        }
    },
    computed: {
      ...mapGetters(["currentUser", "userProfile"])
    },
    components: {
        Drawer: () => import("@/components/NavigationDrawer"),
        LoadingDialog: () => import("@/components/LoadingDialog")
    }
};
</script>
