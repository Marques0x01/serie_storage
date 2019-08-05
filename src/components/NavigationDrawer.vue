<template>
    <v-navigation-drawer app dark v-model="drawer" class="hidden-md-and-up">
        <v-list>
            <v-list-tile>
                <v-list-tile-action>
                    <v-icon class="white--text">dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="white--text">Dashboard</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    computed: {
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.state.drawer = val;
            }
        }
    }
};
</script>


