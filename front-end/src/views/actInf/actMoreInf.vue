<template>
    <Row class="actMoreInf" >
        <Col class="col-1" >
            <student-inf ></student-inf>
        </Col>
    </Row>
</template>

<script>
    import StudentInf from "../../components/pubInf/studentInf";
    export default {
        name: "actMoreInf",
        components: {StudentInf},
        created() {
            this.$store.state.dashboard = false;
        },
        beforeDestroy() {
            this.$store.state.dashboard = true;
        }
    }
</script>

<style scoped>
.actMoreInf{
    position: relative;
    border: 1px solid red;
}

.col-1{
    margin-top: 3%;
    margin-left: 5%;
}
</style>