<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>RGB</h1>
        </n-flex>
        <n-flex justify="center">
            <img id="myImage" src="D:\WebUSBDriver\SmashProWebDriverV2\src\desc.png" alt="Sample Image"
                style="width: 1000px; height: 500px;" @click="rgb_click_handler">
            <n-modal v-model:show="showModal">
                <n-card style="width: 600px" title="模态框" :bordered="false" size="huge" role="dialog" aria-modal="true">
                    <n-flex vertical>
                        <n-color-picker :show-preview="true" v-model:value="color_picker_value"/>
                        <n-flex justify="space-around">
                            <n-button @click="()=>showModal=false">cancel</n-button>
                            <n-button @click="color_picker_confirm">confirm</n-button>
                        </n-flex>
                    </n-flex>
                </n-card>
            </n-modal>
        </n-flex>
    </n-flex>
</template>
<script lang="ts">
import { NButton, useModal } from 'naive-ui';
import { h, ref } from 'vue';
import { conf, hex_to_rgb, rgb_to_hex, send_conf } from './webusb';

const rgb_pos = [
    {
        x: 295,
        y: 131,
        active: true,
    }, {
        x: 215,
        y: 136,
        active: true,
    }, {
        x: 214,
        y: 208,
        active: true,
    }, {
        x: 298,
        y: 207,
        active: true,
    }, {
        x: 0,
        y: 0,
        active: true,
    }, {
        x: 0,
        y: 0,
        active: true,
    }, {
        x: 0,
        y: 0,
        active: true,
    }, {
        x: 0,
        y: 0,
        active: true,
    }, {
        x: 466,
        y: 290,
        active: true,
    }, {
        x: 457,
        y: 232,
        active: true,
    }, {
        x: 548,
        y: 224,
        active: true,
    }, {
        x: 551,
        y: 293,
        active: true,
    },
];
let showModal=ref(false);
let rgb_id:number=0;
let color_picker_value=ref("#ffffff");
function rgb_click(id: number, x: number, y: number) {
    //alert("clicked"+id.toString());
    console.log("clicked " + id.toString());
    rgb_id=id;
    color_picker_value.value = rgb_to_hex(conf.rgb_data[id]);
    showModal.value = true;
}
export default {
    setup() {
        return {
            showModal,
            color_picker_value,
        };
    },
    methods: {
        rgb_click_handler(event: any) {
            // 获取点击事件的位置信息
            let x = event.clientX; // 相对于视口的X坐标
            let y = event.clientY; // 相对于视口的Y坐标
            const rect = event.target.getBoundingClientRect(); // 获取图片的边界信息
            const offsetX = event.clientX - rect.left; // 相对于图片的X坐标
            const offsetY = event.clientY - rect.top; // 相对于图片的Y坐标
            console.log(`点击位置（相对于视口）: X=${x}, Y=${y}`);
            console.log(`点击位置（相对于图片）: X=${offsetX}, Y=${offsetY}`);
            //x=offsetX;
            //y=offsetY;
            for (let i = 0; i < rgb_pos.length; ++i) {
                if (((offsetX - rgb_pos[i].x) * (offsetX - rgb_pos[i].x) + (offsetY - rgb_pos[i].y) * (offsetY - rgb_pos[i].y)) < 30 * 30)//clicked
                {
                    rgb_click(i, x, y);
                    break;
                }
            }
        },
        color_picker_confirm(){
            conf.rgb_data[rgb_id]=hex_to_rgb(color_picker_value.value);
            console.log("rgb set at "+rgb_id.toString());
            send_conf(0);
        }
    }
}
</script>