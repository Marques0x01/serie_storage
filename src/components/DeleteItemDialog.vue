<template>
    <v-dialog
        v-model="isDeleteDialog"
        v-if="isDeleteDialog"
        width="50%"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        @input="onClose()"
    >
        <v-card flat>
            <v-card-title class="headline black white--text">Delete Item</v-card-title>
            <v-card-text>
                <v-container>
                    <v-checkbox
                        label="Select All"
                        color="black"
                        v-model="isCheckAll"
                        @click="toogleCheckAll"
                        v-if="items.length > 1"
                    ></v-checkbox>
                    <v-layout wrap>
                        <v-flex xs12 sm4 md4 v-for="(item, i) in items" :key="i">
                            <v-checkbox
                                :label="item.title"
                                :value="item"
                                color="black"
                                v-model="selectedItems"
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>
                    <v-layout justify-end>
                        <v-btn outline color="error" @click.prevent="onDeleteItem()" large>Delete</v-btn>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
        <LoadingDialog :title="'Deleting Item(s)'" />
    </v-dialog>
</template>

<script>

export default {
    name: "DeleteItemDialog",
    props: {
        items: Array
    },
    data() {
        return {
            isDeleteDialog: false,
            selectedItems: [],
            isCheckAll: false
        };
    },
    components: {
        LoadingDialog: () => import("@/components/LoadingDialog")
    },
    methods: {
        onClose() {
            this.isDeleteDialog = false;
        },
        toogleCheckAll() {
            if (this.isCheckAll) {
                this.isCheckAll = true;
                this.selectedItems = this.items;
                return;
            }
            this.isCheckAll = false;
            this.selectedItems = [];
        },
        onDeleteItem() {
            if (this.isCheckAll) {
                this.$store.dispatch("deleteAllItems");
            } else {
                this.$store.dispatch("deleteItem", this.selectedItems);
            }
            this.isDeleteDialog = false;
            this.selectedItems = [];
            this.isCheckAll = false;
        }
    }
};
</script>
