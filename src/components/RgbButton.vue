<template>
    <n-button circle size="tiny"
        :color="rgb_button_color_cal(id)" :text-color="rgb_button_color_cal_rev(id)">Set</n-button>
</template>
<script lang="ts">
import { NButton, useModal } from 'naive-ui';
import { defineComponent, h, reactive, ref } from 'vue';
import { conf, hex_to_rgb, rgb_to_hex, send_conf } from './webusb';
export default defineComponent({
    name:'RgbButton',
    props: {
        rgb_id: Number
    },
    setup(props, ctx){
        return{
            id:props.rgb_id
        };
    },
    methods:{
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
                return (id: number): string => { return rgb_to_hex({ r: 255 - conf.rgb_data[id].r, g: 255 - conf.rgb_data[id].g, b: 255 - conf.rgb_data[id].b }); }
            },
            set(v:any){}
        }
    }
})
</script>