<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>Rumble</h1>
        </n-flex>
        <n-flex justify="center">
            <n-card title="left rumble ratio">
                <n-flex vertical>
                    <n-flex>
                        <span>high band:</span>
                        <n-input-number v-model:value="rumble_ratio_0" size="small" style="width:150px"/>%
                        <n-slider v-model:value="rumble_ratio_0" :step="1" :min="0" :max="200" />
                    </n-flex>
                    <n-flex>
                        <span>low band:</span>
                        <n-input-number v-model:value="rumble_ratio_1" size="small" style="width:150px"/>%
                        <n-slider v-model:value="rumble_ratio_1" :step="1" :min="0" :max="200" />
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="right rumble ratio">
                <n-flex vertical>
                    <n-flex>
                        <span>high band:</span>
                        <n-input-number v-model:value="rumble_ratio_2" size="small" style="width:150px"/>%
                        <n-slider v-model:value="rumble_ratio_2" :step="1" :min="0" :max="200" />
                    </n-flex>
                    <n-flex>
                        <span>low band:</span>
                        <n-input-number v-model:value="rumble_ratio_3" size="small"  style="width:150px"/>%
                        <n-slider v-model:value="rumble_ratio_3" :step="1" :min="0" :max="200" />
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="rumble strategy">
                <n-flex vertical>
                    <n-flex>
                        <span>rumble switch:</span>
                        <n-switch v-model:value="rumble_enabled" />
                    </n-flex>
                    <n-flex>
                        <span>rumble mode:</span>
                        <n-select v-model:value="rumble_mode" :options="rumble_mode_list" style="width: 150px" />
                    </n-flex>
                    <n-flex>
                        <span>rise low amp(hack):</span>
                        <n-switch v-model:value="low_amp_rise_hack" size='medium'/>
                    </n-flex>
                    <n-flex>
                        <span>rumble wave switch strategy(legacy mode only):</span>
                        <n-select v-model:value="rumble_pattern" :options="rumble_pattern_list" style="width: 300px" />
                    </n-flex>
                </n-flex>
            </n-card>
        </n-flex>
    </n-flex>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { conf,AMP_FACTOR } from './webusb'
import { configProviderProps } from 'naive-ui';
export default {
    setup() {
        return {
            conf,
            rumble_pattern_list:[
                {
                    label: 'play wave with 0 amplitude',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'skip wave with 0 amplitude',
                    value: 1,
                    disabled: false
                }
            ],
            rumble_mode_list:[
                {
                    label: 'new',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'legacy',
                    value: 1,
                    disabled: false
                }
            ]
        }
    },
    computed:{
        rumble_enabled:{
            get():boolean{
                return !(conf.config_bitmap1&0x20);
            },
            set(v:boolean){
                if(v)
                    conf.config_bitmap1&=(~0x20);
                else
                    conf.config_bitmap1|=0x20;
            }
        },
        rumble_ratio_0:{
            get(){
                return conf.hd_rumble_amp_ratio[0]/AMP_FACTOR*100;
            },
            set(v:any){
                v/=100;
                if(v>=2)v=2;
                else if(v<0)v=0
                conf.hd_rumble_amp_ratio[0]=v*AMP_FACTOR;
            }
        },
        rumble_ratio_1:{
            get(){
                return conf.hd_rumble_amp_ratio[1]/AMP_FACTOR*100;
            },
            set(v:any){
                v/=100;
                if(v>=2)v=2;
                else if(v<0)v=0
                conf.hd_rumble_amp_ratio[1]=v*AMP_FACTOR;
            }
        },
        rumble_ratio_2:{
            get(){
                return conf.hd_rumble_amp_ratio[2]/AMP_FACTOR*100;
            },
            set(v:any){
                v/=100;
                if(v>=2)v=2;
                else if(v<0)v=0
                conf.hd_rumble_amp_ratio[2]=v*AMP_FACTOR;
            }
        },
        rumble_ratio_3:{
            get(){
                return conf.hd_rumble_amp_ratio[3]/AMP_FACTOR*100;
            },
            set(v:any){
                v/=100;
                if(v>=2)v=2;
                else if(v<0)v=0
                conf.hd_rumble_amp_ratio[3]=v*AMP_FACTOR;
            }
        },
        rumble_pattern:{
            get():number{
                return (conf.config_bitmap1>>6)&0x1;
            },
            set(v:number){
                conf.config_bitmap1=(conf.config_bitmap1&0xbf)|((v<<6)&0x40);
            }
        },
        rumble_mode:{
            get():number{
                return (conf.config_bitmap2>>5)&0x1;
            },
            set(v:number){
                conf.config_bitmap2=(conf.config_bitmap2&0xdf)|((v<<5)&0x20);
            }
        },
        low_amp_rise_hack:{
            get():boolean{
                return ((conf.config_bitmap2>>4)&0x1)==1;
            },
            set(v:boolean){
                conf.config_bitmap2=(conf.config_bitmap2&0xef)|(((v?1:0)<<4)&0x10);
            }
        }
    },
    methods: {
    },
    mounted() {
    },
    beforeDestroy() {
    }
}
</script>