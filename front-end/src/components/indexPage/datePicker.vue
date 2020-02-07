<template>
    <div id="datePicker">
        <Row >
            <Col span="12">
                <DatePicker type="date" placeholder="Select date" style="width: 200px" format="yyyy-MM-dd"  @on-change='handleChangeDate' ></DatePicker>
            </Col>
            <Col span="12">
                <TimePicker type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px" @on-change='handleChangeTime'></TimePicker>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        name: "date-picker",
        data() {
            return {
                // choosenDate : "",
                // choosenTime : ""
            }
        },
        methods:{
            handleChangeDate(date){
                this.$emit("dateIsComing",date);
            },
            handleChangeTime(time){
                this.$emit("timeIsComing",time);
            }
        }

    }
</script>
