<template>
    <v-dialog v-model="loading" hide-overlay persistent width="400">
        <v-card color="black" dark>
            <v-card-text>
                Please wait. {{title}}
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: "LoadingDialog",
    props: { title: String },
    computed: {
        ...mapGetters(["loading"])
    }
};
</script>
