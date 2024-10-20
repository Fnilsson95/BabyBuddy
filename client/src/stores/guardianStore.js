import { reactive } from "vue";
import { childApi } from "../api/v1/child";
import { guardianApi } from "@/api/v1/guardians";
import { bookingApi } from "@/api/v1/bookings";

export const store = reactive({
    guardian: {
        firstName: "",
        lastName: "",
        children: [],
        bookings: []
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
            ...this.guardian.children.find((child) => child._id === childUpdate._id),
            ...childUpdate
        }
        await childApi.updateChild(updatedChild._id, updatedChild);
        this.guardian.children = this.guardian.children.map((child) => {
            return child._id === updatedChild._id ? updatedChild : child
        });
        this.guardian.bookings = this.guardian.bookings.map((booking) => {
            return {
                ...booking,
                children: booking.children.map((child) => {
                    return child._id === updatedChild._id ? updatedChild : child
                })
            };
        });
    },

    async createChild(childData = {}) {
        const { newChild } = await guardianApi.createChild(this.guardian._id, childData)
        this.guardian.children = [...this.guardian.children, newChild];
    },

    async deleteChild(childToRemoveId) {
        await guardianApi.deleteChild(this.guardian._id, childToRemoveId)
        this.guardian.children = this.guardian.children.filter((child) => child._id !== childToRemoveId)
    },
    async deleteAllChildren() {
        await guardianApi.deleteAllChildren(this.guardian._id)
        this.guardian.children = [];
    },
    async createBooking(bookingData) {
        try {
            const { newBooking } = await bookingApi.createBooking({ ...bookingData, guardian: this.guardian._id });
            this.guardian.bookings = [...this.guardian.bookings, newBooking];
        } catch (error) {
            console.error("error:", error);
        }
    },
    async deleteBooking(bookingId) {
        await bookingApi.abortBooking(bookingId);
        this.guardian.bookings = this.guardian.bookings.filter((booking) => booking._id !== bookingId)
    },
})