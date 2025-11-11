<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>Joystick</h1>
        </n-flex>
        <n-flex justify="center">
            <n-card title="joystick" class="n-card-large">
                <n-flex justify="space-evenly">
                    <canvas id="ljoy_canvas" width="300" height="350"></canvas>
                    <canvas id="rjoy_canvas" width="300" height="350"></canvas>
                </n-flex>
            </n-card>
        </n-flex>
        <n-flex justify="center">
            <n-card title="Left joystick">
                <n-flex vertical>
                    <n-flex>
                        <n-flex>
                            <span>X ratio:</span>
                            <n-input-number v-model:value="js_ratio_0" 
                            :step="0.03125" size="small" style="width: 150px;"/>
                        </n-flex>
                        <n-flex>
                            <span>reverse:</span>
                            <n-switch v-model:value="js_reversed[0]"
                                @update:value="(v: boolean): boolean => { js_reversed[0] = (v); js_ratio_0=-js_ratio_0; return v; }" />
                        </n-flex>
                        <n-slider v-model:value="js_ratio_0" :step="0.03125" :min="0" :max="4"
                            @update:value="(value: number) => js_associate(0, value)" />
                    </n-flex>
                    <n-flex>
                        <n-flex>
                            <span>Y ratio:</span>
                            <n-input-number v-model:value="js_ratio_1" 
                            :step="0.03125" size="small" style="width: 150px;"/>
                        </n-flex>
                        <n-flex>
                            <span>reverse:</span>
                            <n-switch v-model:value="js_reversed[1]"
                                @update:value="(v: boolean): boolean => { js_reversed[1] = (v); js_ratio_1=-js_ratio_1; return v; }" />
                        </n-flex>
                        <n-slider v-model:value="js_ratio_1" :step="0.03125" :min="0" :max="4"
                            @update:value="(value: number) => js_associate(1, value)" />
                    </n-flex>
                    <span>Dead zone(raw):</span>
                    <n-flex>
                        <span>axis X:</span>
                        <n-input-number v-model:value="conf.dead_zone[0]" size="small" />
                        <n-slider v-model:value="conf.dead_zone[0]" :step="1" :min="0" :max="256" />
                        <span>axis Y:</span>
                        <n-input-number v-model:value="conf.dead_zone[1]" size="small" />
                        <n-slider v-model:value="conf.dead_zone[1]" :step="1" :min="0" :max="256" />
                    </n-flex>
                    <span>Factory calibrate:</span>
                    <n-flex>
                        <n-button @click="js_start_calibrate(0)">start</n-button>
                        <n-button @click="js_save_calibration(0)">end</n-button>
                    </n-flex>
                </n-flex>
            </n-card>
            <n-card title="Right joystick">
                <n-flex vertical>
                    <n-flex>
                        <n-flex>
                            <span>X ratio:</span>
                            <n-input-number v-model:value="js_ratio_2" 
                            :step="0.03125" size="small" style="width: 150px;"/>
                        </n-flex>
                        <n-flex>
                            <span>reverse:</span>
                            <n-switch v-model:value="js_reversed[2]"
                                @update:value="(v: boolean): boolean => { js_reversed[2] = (v); js_ratio_2=-js_ratio_2; return v; }" />
                        </n-flex>
                        <n-slider v-model:value="js_ratio_2" :step="0.03125" :min="0" :max="4"
                            @update:value="(value: number) => js_associate(2, value)" />
                    </n-flex>
                    <n-flex>
                        <n-flex>
                            <span>Y ratio:</span>
                            <n-input-number v-model:value="js_ratio_3" 
                            :step="0.03125" size="small" style="width: 150px;" />
                        </n-flex>
                        <n-flex>
                            <span>reverse:</span>
                            <n-switch v-model:value="js_reversed[3]"
                                @update:value="(v: boolean): boolean => { js_reversed[3] = (v); js_ratio_3=-js_ratio_3; return v; }" />
                        </n-flex>
                        <n-slider v-model:value="js_ratio_3" :step="0.03125" :min="0" :max="4"
                            @update:value="(value: number) => js_associate(3, value)" />
                    </n-flex>
                    <span>Dead zone(raw):</span>
                    <n-flex>
                        <span>axis X:</span>
                        <n-input-number v-model:value="conf.dead_zone[2]" size="small" />
                        <n-slider v-model:value="conf.dead_zone[2]" :step="1" :min="0" :max="256" />
                        <span>axis Y:</span>
                        <n-input-number v-model:value="conf.dead_zone[3]" size="small" />
                        <n-slider v-model:value="conf.dead_zone[3]" :step="1" :min="0" :max="256" />
                    </n-flex>
                    <span>Factory calibrate:</span>
                    <n-flex>
                        <n-button @click="js_start_calibrate(1)">start</n-button>
                        <n-button @click="js_save_calibration(1)">end</n-button>
                    </n-flex>
                </n-flex>
            </n-card>
        </n-flex>
        <n-flex justify="center">
            <n-card title="Anti-Snapback Filter:">
                <n-flex>
                    <span>left deadzone:</span>
                    <n-input-number v-model:value="conf.joystick_snapback_deadzone[0]" size="tiny" />
                    <n-slider v-model:value="conf.joystick_snapback_deadzone[0]" :step="1" :min="0" :max="2048" />
                    <span>right deadzone:</span>
                    <n-input-number v-model:value="conf.joystick_snapback_deadzone[1]" size="tiny" />
                    <n-slider v-model:value="conf.joystick_snapback_deadzone[1]" :step="1" :min="0" :max="2048" />
                    <span>filter window(ms):</span>
                    <n-input-number v-model:value="js_snbk_delay" size="tiny" />
                    <n-slider v-model:value="js_snbk_delay" :step="0.001" :min="0" :max="64" />
                </n-flex>
            </n-card>
            <n-card title="Settings & Calibrations:">
                <n-flex vertical>
                    <div>
                        <n-flex justify="space-around">
                            <n-button @click="calibrate_js_center">Calibrate Joystick Center Point</n-button>
                        </n-flex>
                    </div>
                    <span>Plz keep joysticks in the center before calibrating.</span>
                    <n-divider />
                    <div>
                        <n-flex justify="space-between">
                            <span>dead zone mode:</span>
                            <n-select v-model:value="dead_zone_mode" :options="dz_mode_list" style="width: 150px" />
                        </n-flex>
                        <n-flex justify="space-between">
                            <span>joystick range normalization:</span>
                            <n-switch v-model:value="js_normalization"/>
                        </n-flex>
                    </div>
                </n-flex>
            </n-card>
        </n-flex>
    </n-flex>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { conf, JS_FACTOR, device, js, fw_snd, js_start_calibrate, js_save_calibration } from './webusb'
let interval:any;
export default {
    setup() {
        return {
            //js_ratio: ref([1.25, 1.25, 1.25, 1.25]),
            js_reversed: ref([false, false, false, false]),
            dz_mode_list: [
                {
                    label: 'off',
                    value: 0,
                    disabled: false
                },
                {
                    label: 'center',
                    value: 1,
                    disabled: false
                },
                {
                    label: 'axis',
                    value: 2,
                    disabled: false
                },
                {
                    label: 'axis(smoothed)',
                    value: 3,
                    disabled: false
                }
            ],
            interval,
            js_start_calibrate,
            js_save_calibration,
            conf,
        }
    },
    methods: {
        js_associate(id: number, value: number): number {
            //console.log(value);
            conf.joystick_ratio[id] = Math.floor(value * JS_FACTOR * (this.js_reversed[id] ? -1 : 1));
            return value;
        },
        calibrate_js_center(){
            fw_snd(0x07,null);
        },
        draw() {
            let ljco:any = document.getElementById('ljoy_canvas');
            let rjco:any = document.getElementById('rjoy_canvas');
            //console.log(conf.joystick_snapback_deadzone);
            //console.log(conf.dead_zone);
            try {
                let ljc = ljco.getContext('2d');
                let rjc = rjco.getContext('2d');
                ljc.clearRect(0, 0, 300, 350);
                rjc.clearRect(0, 0, 300, 350);
                ljc.beginPath();
                ljc.arc(100, 100, 80, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                ljc.closePath();//关闭当前路径
                rjc.beginPath();
                rjc.arc(100, 100, 80, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                rjc.closePath();//关闭当前路径
                ljc.moveTo(0, 100);//起点坐标
                ljc.lineTo(200, 100);//终点坐标
                ljc.moveTo(100, 0);//起点坐标
                ljc.lineTo(100, 200);//终点坐标
                rjc.moveTo(0, 100);//起点坐标
                rjc.lineTo(200, 100);//终点坐标
                rjc.moveTo(100, 0);//起点坐标
                rjc.lineTo(100, 200);//终点坐标
                ljc.stroke();
                rjc.stroke();
                ljc.beginPath();
                //ljc.arc(100, 100, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                //console.log(js[0].pos);
                ljc.arc(js[0].pos.x * 100 / 2048, (4096 - js[0].pos.y) * 100 / 2048, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                ljc.closePath();
                ljc.fillStyle = 'ffffff';
                ljc.fill();
                ljc.stroke();
                rjc.beginPath();
                //ljc.arc(100, 100, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                rjc.arc(js[1].pos.x * 100 / 2048, (4096 - js[1].pos.y) * 100 / 2048, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                rjc.closePath();
                rjc.fillStyle = 'ffffff';
                rjc.fill();
                rjc.stroke();
                ljc.font        = "normal 20px Arial";
                ljc.strokeStyle = "#000000";
                rjc.font        = "normal 20px Arial";
                rjc.strokeStyle = "#000000";
                ljc.strokeText('X pos:'+(js[0].pos.x-2048).toString()+'        raw pos:'+((js[0].pos.x-2048)/this.js_ratio_0).toString(), 0, 310);
                ljc.strokeText('Y pos:'+(js[0].pos.y-2048).toString()+'        raw pos:'+((js[0].pos.y-2048)/this.js_ratio_1).toString(), 0, 330);
                rjc.strokeText('X pos:'+(js[1].pos.x-2048).toString()+'        raw pos:'+((js[1].pos.x-2048)/this.js_ratio_2).toString(), 0, 310);
                rjc.strokeText('Y pos:'+(js[1].pos.y-2048).toString()+'        raw pos:'+((js[1].pos.y-2048)/this.js_ratio_3).toString(), 0, 330);
            } catch (e: any) {
                console.log("draw error");
                console.log(e.message);
            }
        }
    },
    computed: {
        js_normalization:{
            get():boolean{
                return ((conf.config_bitmap2>>2)&0x1)>0;
            },
            set(v:boolean){
                if(v)
                    conf.config_bitmap2|=0x4;
                else
                    conf.config_bitmap2&=(~0x4);
            }
        },
        js_snbk_delay:{
            get(){
                return conf.joystick_snapback_filter_max_delay/1000;
            },
            set(v:any){
                conf.joystick_snapback_filter_max_delay=v*1000;
            }
        },
        dead_zone_mode:{
            get():number{
                return (conf.config_bitmap2>>6)&0x3;
            },
            set(v:number){
                conf.config_bitmap2=(conf.config_bitmap2&0x3f)|((v<<6)&0xc0)
            }
        },
        js_ratio_0:{
            get():number{
                return conf.joystick_ratio[0] / JS_FACTOR * (this.js_reversed[0] ? -1 : 1);
            },
            set(v:number){
                conf.joystick_ratio[0] = v * JS_FACTOR*(this.js_reversed[0] ? -1 : 1);
            }
        },
        js_ratio_1:{
            get():number{
                return conf.joystick_ratio[1] / JS_FACTOR * (this.js_reversed[1] ? -1 : 1);
            },
            set(v:number){
                conf.joystick_ratio[1]=v*JS_FACTOR*(this.js_reversed[1] ? -1 : 1);
            }
        },
        js_ratio_2:{
            get():number{
                return conf.joystick_ratio[2] / JS_FACTOR * (this.js_reversed[2] ? -1 : 1);
            },
            set(v:number){
                conf.joystick_ratio[2]=v*JS_FACTOR*(this.js_reversed[2] ? -1 : 1);
            }
        },
        js_ratio_3:{
            get():number{
                return conf.joystick_ratio[3] / JS_FACTOR * (this.js_reversed[3] ? -1 : 1);
            },
            set(v:number){
                conf.joystick_ratio[3]=v*JS_FACTOR*(this.js_reversed[3] ? -1 : 1);
            }
        }
    },
    watch:{
        watch_js_ratio:{
            handler(v,oldv){
                for(let i=0;i<4;++i){
                    //console.log(conf.joystick_ratio[i]);
                    this.js_reversed[i]=(conf.joystick_ratio[i]<0);
                    //conf.joystick_ratio[i]=conf.joystick_ratio[i] * (this.js_reversed[i] ? -1 : 1);
                    //console.log(conf.joystick_ratio[i]);
                }
            }
        }
    },
    mounted() {
        for(let i=0;i<4;++i){
            //console.log(conf.joystick_ratio[i]);
            this.js_reversed[i]=(conf.joystick_ratio[i]<0);
            //conf.joystick_ratio[i]=conf.joystick_ratio[i] * (this.js_reversed[i] ? -1 : 1);
            console.log(conf.joystick_ratio[i]);
        }
        this.draw(); // 初始调用
        this.interval = setInterval(this.draw, 1); // 每1ms轮询一次
    },
    unmounted() {
        clearInterval(this.interval); // 清除定时器，防止内存泄漏
    },
    beforeDestroy() {
        clearInterval(this.interval); // 清除定时器，防止内存泄漏
    }
}
</script>

<style scoped></style>