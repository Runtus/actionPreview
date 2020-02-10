<template>
    <div id="datePicker">
        <Row style=" width:600px;"><!--为了保持和其他几个组件宽度一致-->
            <Col span="6" style=" font-size: 1.5em;">
                活动时间:
            </Col>
            <Col span="6" offset="">
                <DatePicker type="date" placeholder="选择日期" style="width: 140%" format="yyyy-MM-dd"  @on-change='handleChangeDate'></DatePicker>
            </Col>
            <Col span="6" offset="3">
                <TimePicker type="timerange" placement="bottom-end" placeholder="选择具体时间" style="width: 140%" @on-change='handleChangeTime'></TimePicker>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        name: "date-picker",
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

<style scoped>
#datePicker{

}
</style>
