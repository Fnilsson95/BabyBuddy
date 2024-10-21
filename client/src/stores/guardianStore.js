import { reactive } from "vue";
import { childApi } from "../api/v1/child";
import { guardianApi } from "@/api/v1/guardians";
import { bookingApi } from "@/api/v1/bookings";

export const store = reactive({
    includedStatuses: ["Pending", "Confirmed"],

    guardian: {
        firstName: "",
        lastName: "",
        children: [],
        bookings: []
    },

    setGuardian(newGuardian) {
        this.guardian = {
            ...newGuardian,
            bookings: newGuardian.bookings.filter(({ status }) => this.includedStatuses.includes(status))
        };
    },

    async init(id) {
        if (!id) {
            throw new Error("You need to provide an id to initialize the guardian store");
        }
        const guardian = await guardianApi.getGuardian(id);
        this.setGuardian(guardian);
    },

    async refreshGuardian() {
        const guardian = await guardianApi.getGuardian(this.guardian._id);
        this.setGuardian(guardian);
    },

    async updateChild(childUpdate = {}) {
        await childApi.updateChild(childUpdate._id, childUpdate);
        await this.refreshGuardian();
    },

    async createChild(childData = {}) {
        const { updatedGuardian } = await guardianApi.createChild(this.guardian._id, childData)
        this.setGuardian(updatedGuardian);
    },

    async deleteChild(childToRemoveId) {
        const { guardian } = await guardianApi.deleteChild(this.guardian._id, childToRemoveId)
        this.setGuardian(guardian);
    },

    async deleteAllChildren() {
        const { guardian } = await guardianApi.deleteAllChildren(this.guardian._id)
        this.setGuardian(guardian);
    },

    async createBooking(bookingData) {
        await bookingApi.createBooking({ ...bookingData, guardian: this.guardian._id });
        await this.refreshGuardian();
    },

    async deleteBooking(bookingId) {
        await bookingApi.abortBooking(bookingId);
        await this.refreshGuardian();
    },
})