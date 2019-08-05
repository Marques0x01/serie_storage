<template>
    <div id="home">
        <CoreToolbar />
        <v-container class="my-5" fluid>
            <v-layout row wrap>
                <v-tooltip top v-for="sort in itemSort" :key="sort.type">
                    <v-btn small flat color="black" @click="sortBy(sort.type)" slot="activator">
                        <v-icon left small>{{sort.icon}}</v-icon>
                        <span class="text--lowercase">{{sort.btnText}}</span>
                    </v-btn>
                    <span>{{sort.tooltipText}}</span>
                </v-tooltip>
                <v-spacer />
                <v-text-field
                    append-icon="search"
                    hide-details
                    solo
                    style="max-width: 300px;"
                    placeholder="Search Item"
                    class="mt-1"
                    v-model="search"
                />
                <v-btn small flat color="black" @click="onDeleteItemDialog()">
                    <span class="text--lowercase">Delete Item</span>
                </v-btn>
                <v-btn small flat color="black" @click="onNewItemDialog()">
                    <span class="text--lowercase">Add New Item</span>
                </v-btn>
            </v-layout>

            <v-card flat v-for="item in userProfile.items" :key="item.title">
                <v-layout row wrap :class="`pa-3 px-4 item ${item.status}`">
                    <v-flex xs12 md6>
                        <div class="caption grey--text">Title</div>
                        <div class="subheading tatle">{{item.title}}</div>
                    </v-flex>
                    <v-flex xs12 sm4 md2>
                        <div class="caption grey--text">Category</div>
                        <div class="subheading">{{item.category}}</div>
                    </v-flex>
                    <v-flex xs12 sm4 md2 v-if="item.category != 'FILM'">
                        <div class="caption grey--text">Season - Episode</div>
                        <div class="subheading">Season {{item.season}} Episode {{item.episode}}</div>
                    </v-flex>
                    <v-flex xs12 sm4 md2 v-else>
                        <div class="caption grey--text">Season - Episode</div>
                        <div class="subheading">-- --</div>
                    </v-flex>
                    <v-flex xs12 sm4 md2>
                        <v-chip
                            small
                            :class="`${item.status} font-weight-bold white--text caption my-2 right`"
                        >{{item.status}}</v-chip>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
        <NewItemDialog ref="newItemDialog" />
        <DeleteItemDialog ref="deleteItemDialog" :items="userProfile.items" />
        <LoadingDialog :title="'Loading Items'" />
        <Snackbar
            :text="'There is no item to be deleted.'"
            :timeout="2000"
            ref="deleteSnack"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { watch } from "fs";

export default {
    name: "Home",
    components: {
        NewItemDialog: () => import("@/components/NewItemDialog"),
        CoreToolbar: () => import("@/components/Toolbar"),
        LoadingDialog: () => import("@/components/LoadingDialog"),
        DeleteItemDialog: () => import("@/components/DeleteItemDialog"),
        Snackbar: () => import("@/components/Snackbar")
    },
    data() {
        return {
            isDeleting: false,
            itemSort: [
                {
                    type: "filter",
                    icon: "filter_b_and_w",
                    btnText: "Filter",
                    tooltipText: "Select filters"
                },
                {
                    type: "title",
                    icon: "folder",
                    btnText: "By Title",
                    tooltipText: "Sort items by title"
                },
                {
                    type: "category",
                    icon: "category",
                    btnText: "By Category",
                    tooltipText: "Sort items by category"
                },
                {
                    type: "status",
                    icon: "tonality",
                    btnText: "By Status",
                    tooltipText: "Sort items by status"
                }
            ]
        };
    },
    methods: {
        sortBy(prop) {
            if (prop == "filter") {
                return;
            }
            this.userProfile.items.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
        },
        onDeleteItemDialog() {
            if (!this.userProfile.items.length) {
                this.$refs.deleteSnack.model = true;
                return;
            }
            this.$refs.deleteItemDialog.isDeleteDialog = true;
        },
        onNewItemDialog() {
            this.$refs.newItemDialog.isNewDialog = true;
        }
    },
    computed: {
        ...mapGetters(["userProfile"]),
        search: {
            get() {
                return this.$store.state.search;
            },
            set(value) {
                this.$store.state.search = value;
            }
        }
    } 
};
</script>
