import { reactive } from "vue";

export const store = reactive({
    guardian: {
        name: {
            firstName: "",
            lastName: "",
        }
    },
    async updateGuardian(guardianUpdate = {}) {
        const updatedGuardian = {
            ...this.guardian,
            ...guardianUpdate
        }
        this.guardian = updatedGuardian;
    },
    setGuardian(newGuardian) {
        this.guardian = newGuardian;
    },
})