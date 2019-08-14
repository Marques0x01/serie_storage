<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="login-card">
                    <v-toolbar dark>
                        <v-toolbar-title class="subtitle-2">Login In to Your Account</v-toolbar-title>
                    </v-toolbar>
                    <v-form class="pa-4">
                        <v-text-field size="sm"
                            name="email"
                            :rules="[rules.required]"
                            :append-icon="'person'"
                            label="Email"
                            v-model="user.email"
                        ></v-text-field>
                        <v-text-field
                            name="password"
                            :rules="[rules.required]"
                            required
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            label="Password"
                            v-model="user.password"
                        ></v-text-field>
                        <v-flex text-xs-center>
                            <v-btn
                                type="submit"
                                large
                                dark
                                block
                                class="font-weight-bold"
                                @click.prevent="onLogin()"
                                @keydown.enter="onLogin()"
                            >Login</v-btn>
                        </v-flex>
                        <v-flex xs12 md12 sm12>
                            <router-link
                                to="/recover-account"
                                class=" font-weight-bold login-text-button"
                            >
                                <v-card-text>Forgot Username / Password ?</v-card-text>
                            </router-link>
                            <router-link
                                to="/sign-up"
                                class="font-weight-bold login-text-button"
                            >
                                <v-card-text>Don't have an account ? Sing Up</v-card-text>
                            </router-link>
                        </v-flex>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
        <LoadingDialog :title="'Checking User'" />
    </v-container>
</template>
<script>
import axios from "axios";

export default {
    name: "Login",
    components: {
        SignUp: () => import("@/views/SignUp"),
        LoadingDialog: () => import("@/components/LoadingDialog")
    },
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            showPassword: false,
            rules: {
                required: value => !!value || "Field required",
                min: value => value.length >= 4 || "Minimum 4 characters"
            }
        };
    },
    methods: {
        onLogin() {
            this.$store.dispatch("login", this.user);
        }
    }
};
</script>

<style lang="scss" scoped>
.login-text-button {
    text-decoration: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
}
</style>
