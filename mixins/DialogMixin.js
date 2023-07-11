export const DialogMixin = {

    props: {
        isDialogOpen: {
            type: Boolean,
            default: false
        },
    },

    computed: {
        showDialog: {
            get() {
                return this.isDialogOpen
            },
            set(value) {
                this.$emit('close', value)
            }
        },
    },

    methods: {
        closeDialog() {
            this.$emit("close");
        },
    }

}