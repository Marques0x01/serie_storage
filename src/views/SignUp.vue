<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="login-card">
                    <v-toolbar dark>
                        <v-toolbar-title class="title font-weight-bold">Sign Up</v-toolbar-title>
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
                            label="Name"
                            v-model="user.name"
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="'email'"
                            label="Email"
                            :rules="[rules.required]"
                            v-model="user.email"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="'https'"
                            label="Password"
                            v-model="user.password"
                            :rules="[rules.minPass]"
                            type="password"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="'https'"
                            label="Confirm Password"
                            :rules="[rules.required]"
                            :error-messages="passwordMatchError()"
                            v-model="passConfirmation"
                            type="password"
                        ></v-text-field>
                        <v-flex text-xs-center>
                            <v-btn
                                type="submit"
                                large
                                dark
                                block
                                class="font-weight-bold my-4"
                                @click.prevent="onRegister()"
                            >Register</v-btn>
                        </v-flex>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
        <LoadingDialog :title="'Creating User'" />
    </v-container>
</template>

<script>
export default {
    name: "SignUp",
    components: {
        LoadingDialog: () => import("@/components/LoadingDialog")
    },
    data() {
        return {
            isRegisterDialog: false,
            user: {
                name: "",
                email: "",
                password: "",
                items: [],
                role: "USER"
            },
            passConfirmation: "",
            rules: {
                required: value => !!value || "Field required",
                minPass: value =>
                    (!!value && value.length >= 6) ||
                    "Password must has 6 caracters"
            }
        };
    },
    methods: {
        onClose() {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
        },
        onRegister() {
            if (!this.$refs.form.validate()) {
                return console.log("Error creating user");
            }

            if (this.user.password != this.passConfirmation) {
                console.log("Password Error");
                return;
            }

            this.$store.dispatch("signUp", this.user);

        },
        passwordMatchError() {
            return this.user.password === this.passConfirmation
                ? ""
                : "Password does not match";
        }
    }
};
</script>