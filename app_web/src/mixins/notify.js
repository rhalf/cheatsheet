
export default {
    created() {

    },

    data() {

    },

    methods: {
        notifyOpen(message, status) {
            this.$store.dispatch("notifyOpen", {
                message: message,
                status: status,
                visible: true,
            });
        },
        notifyClose() {
            this.$store.dispatch("notifyClose")
        },

        // checkNumber(number) {
        //     if (!number > 0) return false
        //     return true
        // },

        // checkDate(date) {
        // }
    }

}

