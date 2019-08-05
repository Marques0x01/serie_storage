<template>
    <v-snackbar v-model="model" right multi-line :timeout="timeout">
        {{text}}
        <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props: ["text", "timeout"],
    data() {
        return {
            model: false
        };
    }
};
</script>

