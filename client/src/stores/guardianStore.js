import { reactive } from "vue";
import { childApi } from "../api/v1/child";

export const store = reactive({
    guardian: {
        firstName: "",
        lastName: "",
        children: [],
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

    async updateChild(childUpdate = {}) {
        const updatedChild = {
            ...this.guardian.child,
            ...childUpdate
        }
        this.guardian.children = [...this.guardian.children.filter((child) => child._id !== updatedChild._id), updatedChild];
        await childApi.updateChild(updatedChild._id, updatedChild)
    }
})