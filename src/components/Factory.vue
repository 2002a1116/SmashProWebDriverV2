<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>Hardware Info</h1>
        </n-flex>
        <n-flex justify="center">
            <h4>Set Hardware Info Here</h4>
            <h4>硬件信息设置</h4>
        </n-flex>
        <n-flex justify="center">
            <n-card title="Hardware Info">
                <n-flex>
                    <span>pcb rev:</span>
                    <n-select v-model:value="factory_config.pcb_rev" :options="pcb_rev_list" style="width: 240px" />
                </n-flex>
                <n-flex>
                    <span>input_typ:</span>
                    <n-select v-model:value="factory_config.input_typ" :options="input_typ_list" style="width: 150px" />
                </n-flex>
                <n-flex>
                    <span>led typ:</span>
                    <n-select v-model:value="factory_config.led_typ" :options="led_typ_list" style="width: 150px" />
                </n-flex>
                <n-flex>
                    <span>rgb typ:</span>
                    <n-select v-model:value="factory_config.rgb_typ" :options="rgb_typ_list" style="width: 150px" />
                </n-flex>
                <n-flex>
                    <span>rgb cnt:</span>
                    <n-input-number v-model:value="factory_config.rgb_cnt" :step="1" :min="0" :max="31" size="small" style="width: 100px;"/>
                    <span>#default is 31</span>
                </n-flex>
                <n-flex justify="space-around">
                    <n-button @click="read_erom(0x0000, 0x0B)">Read</n-button>
                    <n-button @click="factory_config_save()">Save</n-button>
                </n-flex>
            </n-card>
            <n-card title="Info import&export">
                <n-flex vertical>
                    <n-input v-model:value="info_seri" type="textarea" :autosize="{
                        minRows: 1,
                        maxRows: 100,
                    }"></n-input>
                    <n-flex justify="space-around">
                        <n-button @click="() => { fac_conf_unserilize(JSON.parse(info_seri));console.log(factory_config); }">import</n-button>
                        <n-button @click="() => { info_seri = JSON.stringify(factory_config); }">export</n-button>
                    </n-flex>
                </n-flex>
            </n-card>
        </n-flex>
    </n-flex>
</template>
<script lang="ts">
import { ref } from 'vue';
import { fac_conf_unserilize, factory_config, factory_config_save,read_erom} from './webusb'
export default {
    setup() {
        return {
            factory_config,
            factory_config_save,
            fac_conf_unserilize,
            read_erom,
            info_seri:ref(""),
            pcb_rev_list:[
                {
                    label: 'REV 2.00',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'REV 2.13',
                    value: 1,
                    disabled: false
                },
            ],
            input_typ_list:[
                {
                    label: 'SmashPro PCB',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'Stock PCB',
                    value: 1,
                    disabled: false
                }
            ],
            led_typ_list:[
                {
                    label: 'Indicate Led Only',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'Full Led',
                    value: 1,
                    disabled: false
                }
            ],
            rgb_typ_list:[
                {
                    label: 'Pwr Led Only',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'Full Led',
                    value: 1,
                    disabled: false
                }
            ],
        }
    },
    computed:{
    },
    methods: {
    },
    mounted() {
    },
    beforeDestroy() {
    }
}
</script>