<template>
    <v-dialog
        v-model="isNewDialog"
        v-if="isNewDialog"
        width="50%"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        @input="onClose()"
    >
        <v-card>
            <v-card-title class="headline black white--text">Add Item</v-card-title>
            <v-form ref="form">
                <v-container class="mt-3">
                    <v-layout row wrap>
                        <v-flex md12>
                            <v-text-field label="Title" outline v-model="item.title"></v-text-field>
                        </v-flex>
                        <v-flex md12>
                            <v-select
                                :items="categories"
                                label="Category"
                                outline
                                v-model="item.category"
                            ></v-select>
                        </v-flex>
                        <v-flex md6>
                            <v-text-field
                                label="Season"
                                type="number"
                                outline
                                v-model="item.season"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md6>
                            <v-text-field
                                label="Episode"
                                type="number"
                                outline
                                v-model="item.episode"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md12>
                            <v-select :items="status" label="Status" outline v-model="item.status"></v-select>
                        </v-flex>
                    </v-layout>
                    <v-card-actions>
                        <v-layout justify-end>
                            <v-btn outline color="black" @click.prevent="onSaveItem()" large>Save</v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-container>
            </v-form>
        </v-card>
        <LoadingDialog :title="'Adding Item'" />
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
const firebase = require("../config/firebaseConfig");

export default {
    name: "NewItemDialog",
    components: {
        LoadingDialog: () => import("@/components/LoadingDialog")
    },
    data() {
        return {
            item: {
                title: "",
                category: "",
                season: "",
                episode: "",
                status: ""
            },
            isNewDialog: false,
            categories: ["SERIE", "ANIME", "FILM"],
            status: ["COMPLETE", "ONGOING", "ONHOLD", "INTERRUPTED"]
        };
    },
    methods: {
        onSaveItem() {
            this.$store.dispatch("addItem", this.item);
            this.item = {};
            this.isNewDialog = false;
        },
        onClose() {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.isNewDialog = false;
        }
    },
    computed: {
        ...mapGetters(["currentUser", "userProfile"])
    }
};
</script>
