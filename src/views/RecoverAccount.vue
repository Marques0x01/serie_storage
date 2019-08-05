<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card light class="recover-card">
                    <v-toolbar dark>
                        <v-toolbar-title class="title font-weight-bold">Recover Password</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <router-link to="/">
                            <i
                                class="material-icons md-36 md-light mt-2"
                                style="cursor: pointer"
                            >keyboard_return</i>
                        </router-link>
                    </v-toolbar>
                    <v-form class="ma-4 pa-2" ref="form">
                        <v-text-field
                            :append-icon="'person'"
                            label="Email"
                            v-model="email"
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-flex text-xs-center>
                            <v-btn
                                type="submit"
                                large
                                dark
                                block
                                class="font-weight-bold my-4"
                                @click.prevent="onRecover()"
                            >Recover</v-btn>
                        </v-flex>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "RecoverAccount",
    data() {
        return {
            isRecoverDialog: false,
            email: "",
            rules: {
                required: value => !!value || "Field required"
            }
        };
    },
    methods: {
        onRecover() {}
    }
};
</script>