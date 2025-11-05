<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>Others</h1>
        </n-flex>
        <n-flex justify="center">
            <n-card title="settings">
                <n-flex vertical>
                    <n-flex justify="space-between">
                        <span>pro firmware version:</span>
                        <n-select v-model:value="conf.pro_fw_version" :options="pro_fw_ver_list" style="width: 150px" />
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>report rate:</span>
                        <n-select v-model:value="conf.in_interval" :options="report_rate_list" style="width: 150px" />
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>packet timer mode:</span>
                        <n-select v-model:value="conf.ns_pkt_timer_mode" :options="pkt_timer_mode_list"
                            style="width: 150px" />
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>Swap A&B:</span>
                        <n-switch v-model:value="a_b_swap" />
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>Swap X&Y:</span>
                        <n-switch v-model:value="x_y_swap" />
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="hardware setting" style="max-width: 500px">
                <n-flex vertical>
                    <n-flex justify="space-around">
                        <span>Controller Firmware Version:</span>
                        {{ fw_version_text }}
                    </n-flex>
                    <n-flex>
                        <span>bluetooth address:</span>
                    </n-flex>
                    <n-flex justify="center">
                        <n-input v-model:value="bd_addr_0" :show-button=false style="width: 45px" min="0"
                            max="255" />:                            
                        <n-input v-model:value="bd_addr_1" :show-button=false style="width: 45px" min="0"
                            max="255" />:
                        <n-input v-model:value="bd_addr_2" :show-button=false style="width: 45px" min="0"
                            max="255" />:
                        <n-input v-model:value="bd_addr_3" :show-button=false style="width: 45px" min="0"
                            max="255" />:
                        <n-input v-model:value="bd_addr_4" :show-button=false style="width: 45px" min="0"
                            max="255" />:
                        <n-input v-model:value="bd_addr_5" :show-button=false style="width: 45px" min="0"
                            max="255" />
                    </n-flex>
                    <n-flex justify="space around">
                        <n-button @click="generate_bd_addr">generate address</n-button>
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>Rgb enable:</span>
                        <n-switch v-model:value="led_enabled" />
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="Shell Color">
                <n-flex vertical>
                    shell:<n-color-picker :show-preview="true" v-model:value="color_shell" />
                    buttons:<n-color-picker :show-preview="true" v-model:value="color_button" />
                    left grip:<n-color-picker :show-preview="true" v-model:value="color_grip_left" />
                    right grip:<n-color-picker :show-preview="true" v-model:value="color_grip_right" />
                    <n-flex justify="space around">
                        <n-button @click="read_erom(0x6050, 0x0C)">Read</n-button>
                        <n-button @click="controller_color_save()">Save</n-button>
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="config import&export">
                <n-flex vertical>
                    <n-input v-model:value="conf_seri" type="textarea" :autosize="{
                        minRows: 1,
                        maxRows: 100,
                    }"></n-input>
                    <n-flex justify="space-around">
                        <n-button @click="import_json_config">import</n-button>
                        <n-button @click="export_json_config">export</n-button>
                    </n-flex>
                </n-flex>
            </n-card>
        </n-flex>
    </n-flex>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { conf, conf_pack, conf_unserilize, controller_color, controller_color_save, fw_version, gen_bt_addr, fw_version_text, hex_to_rgb, read_erom, rgb_to_hex, factory_config, fac_conf_unserilize, factory_config_save, send_conf, send_rgb } from './webusb'
import { Send } from '@vicons/ionicons5';
export default {
    setup() {
        return {
            fw_version_text,
            reactive,
            conf_unserilize,
            conf_seri: ref(""),
            conf,
            read_erom,
            controller_color_save,
            pro_fw_ver_list: [
                {
                    label: '3.48',
                    value: 0,
                    disabled: false
                },
                {
                    label: '3.49',
                    value: 2,
                    disabled: false
                },
                {
                    label: '4.33',
                    value: 1,
                    disabled: true
                }
            ],
            report_rate_list: [
                {
                    label: '60',
                    value: 16,
                    disabled: true
                },
                {
                    label: '125',
                    value: 8,
                    disabled: false
                },
                {
                    label: '200',
                    value: 5,
                    disabled: false
                },
                {
                    label: '250',
                    value: 4,
                    disabled: false
                },
                {
                    label: '500',
                    value: 2,
                    disabled: true
                }
            ],
            pkt_timer_mode_list: [
                {
                    label: 'stock',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'timestamp',
                    value: 1,
                    disabled: false
                },
                {
                    label: 'packet counter',
                    value: 2,
                    disabled: false
                },
            ]
        }
    },
    computed: {
        a_b_swap: {
            get(): boolean {
                return (conf.config_bitmap1 & 0x10) != 0;
            },
            set(v: boolean) {
                if (v) conf.config_bitmap1 |= 0x10;
                else conf.config_bitmap1 &= (~0x10);
            }
        },
        x_y_swap: {
            get(): boolean {
                return (conf.config_bitmap1 & 0x08) != 0;
            },
            set(v: boolean) {
                if (v) conf.config_bitmap1 |= 0x08;
                else conf.config_bitmap1 &= (~0x08);
            }
        },
        color_shell: {
            get(): string {
                return rgb_to_hex(controller_color[0]);
            },
            set(v: string) {
                controller_color[0] = hex_to_rgb(v);
            }
        },
        color_button: {
            get(): string {
                return rgb_to_hex(controller_color[1]);
            },
            set(v: string) {
                controller_color[1] = hex_to_rgb(v);
            }
        },
        color_grip_left: {
            get(): string {
                return rgb_to_hex(controller_color[2]);
            },
            set(v: string) {
                controller_color[2] = hex_to_rgb(v);
            }
        },
        color_grip_right: {
            get(): string {
                return rgb_to_hex(controller_color[3]);
            },
            set(v: string) {
                controller_color[3] = hex_to_rgb(v);
            }
        },
        bd_addr_0:{
            get(){
                return conf.bd_addr[0].toString(16).padStart(2, '0');
            },
            set(str:string){
                conf.bd_addr[0]=parseInt(str,16);
            }
        },
        bd_addr_1:{
            get(){
                return conf.bd_addr[1].toString(16).padStart(2, '0');
            },
            set(str:string){
                conf.bd_addr[1]=parseInt(str,16);
            }
        },
        bd_addr_2:{
            get(){
                return conf.bd_addr[2].toString(16).padStart(2, '0');
            },
            set(str:string){
                conf.bd_addr[2]=parseInt(str,16);
            }
        },
        bd_addr_3:{
            get(){
                return conf.bd_addr[3].toString(16).padStart(2, '0');
            },
            set(str:string){
                conf.bd_addr[3]=parseInt(str,16);
            }
        },
        bd_addr_4:{
            get(){
                return conf.bd_addr[4].toString(16).padStart(2, '0');
            },
            set(str:string){
                conf.bd_addr[4]=parseInt(str,16);
            }
        },
        bd_addr_5:{
            get(){
                return conf.bd_addr[5].toString(16).padStart(2, '0');
            },
            set(str:string){
                conf.bd_addr[5]=parseInt(str,16);
            }
        },
        led_enabled:{
            get():boolean{
                return (conf.config_bitmap1&0x02)==0;
            },
            set(v:boolean){
                if (!v) conf.config_bitmap1 |= 0x02;
                else conf.config_bitmap1 &= (~0x02);
            }
        }
    },
    methods: {
        generate_bd_addr() {
            gen_bt_addr();
        },
        export_json_config(){
            let p=Object();
            p.conf=conf;
            p.factory_config=factory_config;
            p.controller_color=controller_color;
            this.conf_seri=JSON.stringify(p);
        },
        import_json_config(){
            let p=JSON.parse(this.conf_seri);
            conf_unserilize(p.conf);
            fac_conf_unserilize(p.factory_config);
            factory_config_save();
            send_conf(0);
            send_rgb(0);
            //Object.assign(controller_color,p.controller);
            this.color_shell=rgb_to_hex(p.controller_color[0]);
            this.color_button=rgb_to_hex(p.controller_color[1]);
            this.color_grip_left=rgb_to_hex(p.controller_color[2]);
            this.color_grip_right=rgb_to_hex(p.controller_color[3]);
            console.log(factory_config);
        }
    },
    beforeDestroy() {
    }
}
</script>