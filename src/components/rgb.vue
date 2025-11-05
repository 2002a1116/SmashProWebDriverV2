<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>RGB</h1>
        </n-flex>
        <n-flex justify="center">
            <div class="rgb_background">
                <RgbButton style="left: 280px;top: 100px; position: absolute;" :text="'Set'" 
                :text_color="rgb_button_color_cal_rev(0)" :bg_color="rgb_button_color_cal(0)" 
                @click="rgb_button_click(0)"/>
                <RgbButton style="left:200px; top: 100px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(1)" :bg_color="rgb_button_color_cal(1)"
                @click="rgb_button_click(1)"/>
                <RgbButton style="left:200px; top: 150px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(2)" :bg_color="rgb_button_color_cal(2)"
                @click="rgb_button_click(2)"/>
                <RgbButton style="left:280px; top: 150px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(3)" :bg_color="rgb_button_color_cal(3)"
                @click="rgb_button_click(3)"/>
                <RgbButton style="left:400px; top: 220px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(4)" :bg_color="rgb_button_color_cal(4)"
                @click="rgb_button_click(4)"/>
                <RgbButton style="left:400px; top: 170px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(5)" :bg_color="rgb_button_color_cal(5)"
                @click="rgb_button_click(5)"/>
                <RgbButton style="left:480px; top: 170px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(6)" :bg_color="rgb_button_color_cal(6)"
                @click="rgb_button_click(6)"/>
                <RgbButton style="left:480px; top: 220px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(7)" :bg_color="rgb_button_color_cal(7)"
                @click="rgb_button_click(7)"/>
                <RgbButton style="left:370px; top: 240px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(8)" :bg_color="rgb_button_color_cal(8)"
                @click="rgb_button_click(8)"/>
                <RgbButton style="left:370px; top: 160px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(9)" :bg_color="rgb_button_color_cal(9)"
                @click="rgb_button_click(9)"/>
                <RgbButton style="left:370px; top: 125px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(10)" :bg_color="rgb_button_color_cal(10)"
                @click="rgb_button_click(10)"/>
                <RgbButton style="left:410px; top: 145px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(11)" :bg_color="rgb_button_color_cal(11)"
                @click="rgb_button_click(11)"/>
                <RgbButton style="left:550px; top: 170px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(12)" :bg_color="rgb_button_color_cal(12)"
                @click="rgb_button_click(12)"/>
                <RgbButton style="left:505px; top: 125px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(13)" :bg_color="rgb_button_color_cal(13)"
                @click="rgb_button_click(13)"/>
                <RgbButton style="left:465px; top: 90px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(14)" :bg_color="rgb_button_color_cal(14)"
                @click="rgb_button_click(14)"/>
                <RgbButton style="left:437px; top: 100px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(15)" :bg_color="rgb_button_color_cal(15)"
                @click="rgb_button_click(15)"/>
                <RgbButton style="left:410px; top: 110px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(16)" :bg_color="rgb_button_color_cal(16)"
                @click="rgb_button_click(16)"/>
                <RgbButton style="left:370px; top: 90px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(17)" :bg_color="rgb_button_color_cal(17)"
                @click="rgb_button_click(17)"/>
                <RgbButton style="left:315px; top: 100px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(18)" :bg_color="rgb_button_color_cal(18)"
                @click="rgb_button_click(18)"/>
                <RgbButton style="left:340px; top: 140px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(19)" :bg_color="rgb_button_color_cal(19)"
                @click="rgb_button_click(19)"/>
                <RgbButton style="left:300px; top: 130px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(20)" :bg_color="rgb_button_color_cal(20)"
                @click="rgb_button_click(20)"/>
                <RgbButton style="left:240px; top: 185px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(21)" :bg_color="rgb_button_color_cal(21)"
                @click="rgb_button_click(21)"/>
                <RgbButton style="left:240px; top: 235px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(22)" :bg_color="rgb_button_color_cal(22)"
                @click="rgb_button_click(22)"/>
                <RgbButton style="left:300px; top: 215px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(23)" :bg_color="rgb_button_color_cal(23)"
                @click="rgb_button_click(23)"/>
                <RgbButton style="left:320px; top: 195px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(24)" :bg_color="rgb_button_color_cal(24)"
                @click="rgb_button_click(24)"/>
                <RgbButton style="left:300px; top: 175px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(25)" :bg_color="rgb_button_color_cal(25)"
                @click="rgb_button_click(25)"/>
                <RgbButton style="left:280px; top: 195px; position: absolute;" :text="'Set'"
                :text_color="rgb_button_color_cal_rev(26)" :bg_color="rgb_button_color_cal(26)"
                @click="rgb_button_click(26)"/>
            </div>
            <n-modal v-model:show="showModal">
                <n-card style="width: 600px" title="ColorPicker" :bordered="false" size="huge" role="dialog" aria-modal="true">
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
import { conf, hex_to_rgb, rgb_to_hex, send_rgb } from './webusb';
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
            rgb_to_hex,
            conf,
        };
    },
    components:{
        RgbButton,
    },
    methods: {
        color_picker_confirm() {
            conf.rgb_data[rgb_id] = hex_to_rgb(color_picker_value.value);
            console.log("rgb set at " + rgb_id.toString());
            send_rgb(0);
            this.showModal=false;
            //send_conf(0);
        },
        rgb_button_click(id: number) {
            rgb_click(id, 0, 0);
        }
    },
    computed:{
        rgb_button_color_cal: {
            get() {
                return (id: number): string => { return rgb_to_hex(conf.rgb_data[id]); }
            },
            set(v:any){}
        },
        rgb_button_color_cal_rev: {
            get() {
                return (id: number): string => { return rgb_to_hex({ r: 255 - (conf.rgb_data[id]??255).r, g: 255 - (conf.rgb_data[id]??255).g, b: 255 - (conf.rgb_data[id]??255).b }); }
            },
            set(v:any){}
        }
    }
}
</script>