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
                        <n-select v-model:value="conf.ns_pkt_timer_mode" :options="pkt_timer_mode_list" style="width: 150px" />
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>Swap A&B:</span>
                        <n-switch v-model:value="a_b_swap"/>
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>Swap X&Y:</span>
                        <n-switch v-model:value="x_y_swap"/>
                    </n-flex>
                    <n-flex justify="space-between">
                        <span>Disable cross key:</span>
                        <n-switch v-model:value="cross_key_off"/>
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="bluetooth address" style="max-width: 500px">
                <n-flex vertical>
                    <n-flex justify="center">
                        <n-input-number v-model:value="conf.bd_addr[0]" :show-button=false style="width: 50px" min="0" max="255"/>:
                        <n-input-number v-model:value="conf.bd_addr[1]" :show-button=false style="width: 50px" min="0" max="255"/>:
                        <n-input-number v-model:value="conf.bd_addr[2]" :show-button=false style="width: 50px" min="0" max="255"/>:
                        <n-input-number v-model:value="conf.bd_addr[3]" :show-button=false style="width: 50px" min="0" max="255"/>:
                        <n-input-number v-model:value="conf.bd_addr[4]" :show-button=false style="width: 50px" min="0" max="255"/>:
                        <n-input-number v-model:value="conf.bd_addr[5]" :show-button=false style="width: 50px" min="0" max="255"/>
                    </n-flex>
                    <n-flex justify="space around">
                        <n-button @click="generate_bd_addr">generate</n-button>
                    </n-flex>
                </n-flex>
            </n-card>
        </n-flex>
    </n-flex>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { conf, gen_bt_addr } from './webusb'
export default {
    setup() {
        return {
            conf,
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
    computed:{
        a_b_swap:{
            get():boolean{
                return (conf.config_bitmap1&0x10)!=0;
            },
            set(v:boolean){
                if(v)conf.config_bitmap1|=0x10;
                else conf.config_bitmap1&=(~0x10);
            }
        },
        x_y_swap:{
            get():boolean{
                return (conf.config_bitmap1&0x08)!=0;
            },
            set(v:boolean){
                if(v)conf.config_bitmap1|=0x08;
                else conf.config_bitmap1&=(~0x08);
            }
        },
        cross_key_off:{
            get():boolean{
                return (conf.config_bitmap1&0x04)!=0;
            },
            set(v:boolean){
                if(v)conf.config_bitmap1|=0x04;
                else conf.config_bitmap1&=(~0x04);
            }
        }
    },
    methods: {
        generate_bd_addr(){
            gen_bt_addr();
        },
    },
    beforeDestroy() {
    }
}
</script>