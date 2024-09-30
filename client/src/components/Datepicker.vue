<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
    components: { DatePicker },
    data() {
        return {
            start: null,
            end: null
        };
    },
};
</script>

<template>
    <div class="pt-5">
        <p>
            <date-picker v-model:value="start" format="YYYY-MM-DD H:m"></date-picker>
        </p>
        <p>
            <date-picker v-model:value="end" format="YYYY-MM-DD H:m"></date-picker>
        </p>
    </div>
</template>