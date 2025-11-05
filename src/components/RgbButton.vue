<template>
    <n-button circle size="tiny"
        :color="props.bg_color" :text-color="props.text_color">{{ props.text }}</n-button>
</template>
<script lang="ts">
import { NButton, useModal } from 'naive-ui';
import { defineComponent, h, reactive, ref } from 'vue';
import { conf, hex_to_rgb, rgb_to_hex, send_conf } from './webusb';
export default defineComponent({
    name:'RgbButton',
    props: {
        text: String,
        text_color: String,
        bg_color: String
    },
    setup(props, ctx){
        return{
            props,
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
                return (id: number): string => { return rgb_to_hex({ r: 255 - (conf.rgb_data[id]??255).r, g: 255 - (conf.rgb_data[id]??255).g, b: 255 - (conf.rgb_data[id]??255).b }); }
            },
            set(v:any){}
        }
    }
})
</script>