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
                        <n-slider v-model:value="rumble_ratio_0" :step="0.0125" :min="0" :max="200" />
                    </n-flex>
                    <n-flex>
                        <span>low band:</span>
                        <n-input-number v-model:value="rumble_ratio_1" size="small" style="width:150px"/>%
                        <n-slider v-model:value="rumble_ratio_1" :step="0.0125" :min="0" :max="200" />
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="right rumble ratio">
                <n-flex vertical>
                    <n-flex>
                        <span>high band:</span>
                        <n-input-number v-model:value="rumble_ratio_2" size="small" style="width:150px"/>%
                        <n-slider v-model:value="rumble_ratio_2" :step="0.0125" :min="0" :max="200" />
                    </n-flex>
                    <n-flex>
                        <span>low band:</span>
                        <n-input-number v-model:value="rumble_ratio_3" size="small"  style="width:150px"/>%
                        <n-slider v-model:value="rumble_ratio_3" :step="0.0125" :min="0" :max="200" />
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
        }
    },
    computed:{
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