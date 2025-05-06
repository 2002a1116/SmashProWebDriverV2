<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>RGB</h1>
        </n-flex>
        <n-flex justify="center">
            <div class="rgb_background">
                <RgbButton style="left: 280px;top: 100px; position: absolute;" :rgb_id=0 @click="rgb_button_click(0)"></RgbButton>
                <RgbButton style="left: 200px;top: 100px; position: absolute;" :rgb_id=1 @click="rgb_button_click(1)"></RgbButton>
                <RgbButton style="left: 200px;top: 150px; position: absolute;" :rgb_id=2 @click="rgb_button_click(2)"></RgbButton>
                <RgbButton style="left: 280px;top: 150px; position: absolute;" :rgb_id=3 @click="rgb_button_click(3)"></RgbButton>
                <RgbButton style="left: 400px;top: 220px; position: absolute;" :rgb_id=4 @click="rgb_button_click(4)"></RgbButton>
                <RgbButton style="left: 400px;top: 170px; position: absolute;" :rgb_id=5 @click="rgb_button_click(5)"></RgbButton>
                <RgbButton style="left: 480px;top: 170px; position: absolute;" :rgb_id=6 @click="rgb_button_click(6)"></RgbButton>
                <RgbButton style="left: 480px;top: 220px; position: absolute;" :rgb_id=7 @click="rgb_button_click(7)"></RgbButton>  
                <RgbButton style="left: 370px;top: 240px; position: absolute;" :rgb_id=8 @click="rgb_button_click(8)"></RgbButton>
                <RgbButton style="left: 370px;top: 160px; position: absolute;" :rgb_id=9 @click="rgb_button_click(9)"></RgbButton>
                <RgbButton style="left: 370px;top: 125px; position: absolute;" :rgb_id=10 @click="rgb_button_click(10)"></RgbButton>
                <RgbButton style="left: 410px;top: 145px; position: absolute;" :rgb_id=11 @click="rgb_button_click(11)"></RgbButton>
                <RgbButton style="left: 550px;top: 170px; position: absolute;" :rgb_id=12 @click="rgb_button_click(12)"></RgbButton>
                <RgbButton style="left: 505px;top: 125px; position: absolute;" :rgb_id=13 @click="rgb_button_click(13)"></RgbButton>
                <RgbButton style="left: 465px;top: 90px;  position: absolute;" :rgb_id=14 @click="rgb_button_click(14)"></RgbButton>
                <RgbButton style="left: 437px;top: 100px; position: absolute;" :rgb_id=15 @click="rgb_button_click(15)"></RgbButton>
                <RgbButton style="left: 410px;top: 110px; position: absolute;" :rgb_id=16 @click="rgb_button_click(16)"></RgbButton>
                <RgbButton style="left: 370px;top: 90px;  position: absolute;" :rgb_id=17 @click="rgb_button_click(17)"></RgbButton>
                <RgbButton style="left: 315px;top: 100px; position: absolute;" :rgb_id=18 @click="rgb_button_click(18)"></RgbButton>
                <RgbButton style="left: 340px;top: 140px; position: absolute;" :rgb_id=19 @click="rgb_button_click(19)"></RgbButton>
                <RgbButton style="left: 300px;top: 130px; position: absolute;" :rgb_id=20 @click="rgb_button_click(20)"></RgbButton>
                <RgbButton style="left: 240px;top: 185px; position: absolute;" :rgb_id=21 @click="rgb_button_click(21)"></RgbButton>
                <RgbButton style="left: 240px;top: 235px; position: absolute;" :rgb_id=22 @click="rgb_button_click(22)"></RgbButton>
                <RgbButton style="left: 300px;top: 215px; position: absolute;" :rgb_id=23 @click="rgb_button_click(23)"></RgbButton>
                <RgbButton style="left: 320px;top: 195px; position: absolute;" :rgb_id=24 @click="rgb_button_click(24)"></RgbButton>
                <RgbButton style="left: 300px;top: 175px; position: absolute;" :rgb_id=25 @click="rgb_button_click(25)"></RgbButton>
                <RgbButton style="left: 280px;top: 195px; position: absolute;" :rgb_id=26 @click="rgb_button_click(26)"></RgbButton>
            </div>
            <n-modal v-model:show="showModal">
                <n-card style="width: 600px" title="模态框" :bordered="false" size="huge" role="dialog" aria-modal="true">
                    <n-flex vertical>
                        <n-color-picker :show-preview="true" v-model:value="color_picker_value" />
                        <n-flex justify="space-around">
                            <n-button @click="() => showModal = false">cancel</n-button>
                            <n-button @click="color_picker_confirm">confirm</n-button>
                        </n-flex>
                    </n-flex>
                </n-card>
            </n-modal>
        </n-flex>
    </n-flex>
</template>
<style>
.rgb_background{
    position: absolute;
    background-image: url('../desc.png');
    background-size:contain;
    background-position: center;
    height:400px;
    width:800px;
}
</style>
<script lang="ts">
import { h, reactive, ref } from 'vue';
import { conf, hex_to_rgb, rgb_to_hex, send_conf } from './webusb';
import RgbButton from './RgbButton.vue'
import { forEachTrailingCommentRange } from 'typescript';
let showModal = ref(false);
let rgb_id: number = 0;
let color_picker_value = ref("#ffffff");
function rgb_click(id: number, x: number, y: number) {
    //alert("clicked"+id.toString());
    console.log("clicked " + id.toString());
    rgb_id = id;
    color_picker_value.value = rgb_to_hex(conf.rgb_data[id]);
    showModal.value = true;
}
function rgb_button_click(id: number) {
    rgb_click(id, 0, 0);
}
export default {
    setup() {
        return {
            showModal,
            color_picker_value,
            rgb_button_color:reactive([]),
        };
    },
    components:{
        RgbButton,
    },
    methods: {
        color_picker_confirm() {
            conf.rgb_data[rgb_id] = hex_to_rgb(color_picker_value.value);
            console.log("rgb set at " + rgb_id.toString());
            send_conf(0);
        },
        rgb_button_click(id: number) {
            rgb_click(id, 0, 0);
        },
    },
}
</script>