import { reactive, ref } from "vue";

export class rgb{
    r:number=0;
    g:number=0;
    b:number=0;
}
export  function u8a_to_rgb(buf:Uint8Array){
    let res:rgb={r:0,g:0,b:0};
    if(buf.length>=3)
    {
        res.r=buf[0];
        res.g=buf[1];
        res.b=buf[2];
    }
    return res;
}
export function rgb_to_hex(r:rgb){
    return '#'+r.r.toString(16).padStart(2, '0') + r.g.toString(16).padStart(2, '0') + r.b.toString(16).padStart(2, '0');
}
export function rgb_to_u8a(r:rgb){
    let res=new Uint8Array(3);
    res[0]=r.r;
    res[1]=r.g;
    res[2]=r.b;
    return res;
}
export function hex_to_rgb(s:string):rgb{
    let r:rgb={r:0,g:0,b:0};
    if(s.length<7)return r;
    r.r=parseInt(s.slice(1,3),16);
    r.g=parseInt(s.slice(3,5),16);
    r.b=parseInt(s.slice(5,7),16);
    console.log(r);
    return r;
}
export function fetch_u16(arr: any[] | Uint8Array<ArrayBuffer>) {
    return arr[0] + (arr[1] << 8);
}
export function fetch_u32(arr: number[]) {
    return arr[0] + (arr[1] << 8) + (arr[2] << 16) + (arr[3] << 24);
}
export function put_u16(v) {
    return new Uint8Array([v & 0xff, 0xff & (v >> 8)]);
}
export class conf_pack{
    /*union{
        uint8_t config_bitmap1;
        struct{
            uint8_t nonexist:1;
            uint8_t led_disabled:1;
            uint8_t cross_key_disabled:1;//maybe someone want it
            uint8_t x_y_swap:1;
            uint8_t a_b_swap:1;
            uint8_t rumble_disabled:1;
            uint8_t rumble_pattern:1;
            uint8_t imu_disabled:1;
        };
    };*/
    config_bitmap1=(0);
    in_interval=(8);
    out_interval=(8);
    hd_rumble_amp_ratio=([0,0,0,0]);//len:4
    joystick_ratio=([0,0,0,0]);//len:4
    imu_sample_gap=(1750);//u16
    joystick_snapback_deadzone=([1400,1400]);//len:2
    joystick_snapback_filter_max_delay=(10000);//u16
    bd_addr=[0,0,0,0,0,0];//len:6
    imu_ratio_x=(127);//div 127
    imu_ratio_y=(127);//div 127
    imu_ratio_z=(127);//div 127
    pro_fw_version=(2);
    ns_pkt_timer_mode=(0);//0:stock(timestamp_div_5) 1:timestamp 2:pkt cnt
    dead_zone=reactive([0,0,0,0]);//len:4
    dead_zone_mode=(0);
    rgb_cnt=(27);
    rgb_data:rgb[]=([]);//len>=29
    config_bitmap2=(0);
};
export let conf=reactive(new conf_pack());
export class coord{
    x:number=0;
    y:number=0;
}
export function coord_max(a:coord,b:coord){
    let c:coord = {
        x:(a.x>b.x?a.x:b.x),
        y:(a.y>b.y?a.y:b.y)
    }
    return c;
}
export function coord_min(a:coord,b:coord){
    let c:coord = {
        x:(a.x<b.x?a.x:b.x),
        y:(a.y<b.y?a.y:b.y)
    }
    return c;
}
export class js_data{
    pos:coord=new coord;
    internal_center:coord=new coord;
    center:coord=new coord;
    max:coord=new coord;
    min:coord=new coord;
}
export let controller_color=reactive(new Array<rgb>(4));
export let js:js_data[]=[new js_data,new js_data]
export let connection_status:number;
export let device: any; // 需要连接或已连接的设备
export let msg:String | null;
export let fw_version:number;
export let array = new Array();
export let red_cnt = 0;
export let snd_cnt = 0;
export let ofst = 0;
export let js_cali_fsm = new Array<number>(2);
export const JS_FACTOR = 32.0;
export const AMP_FACTOR = 128.0;
export const PAYLOAD_LENGTH = 61;
export const GYRO_FACTOR =127.0;
export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function gen_bt_addr() {
    let tmp = new Uint8Array(6);
    for (let i = 0; i < 6; ++i) {
        //tmp += getRandomInt(0, 255).toString(16).padStart(2, '0') + ":";
        tmp[i]=(getRandomInt(0, 255));
    }
    conf.bd_addr = [...tmp];
}
export function get_radio_value(radios: string | any[]) {
    for (let i = 0; i < radios.length; ++i) {
        if (radios[i].checked === true) {
            return parseInt(radios[i].value, 10);
        }
    }
    return 0;
}
export function set_radio_value(radios: string | any[], v: number) {
    for (let i = 0; i < radios.length; ++i) {
        radios[i].checked = false;
    }
    for (let i = 0; i < radios.length; ++i) {
        if (radios[i].value == v) {
            radios[i].checked = true;
        }
    }
}
export async function js_start_calibrate(id:number) {
    if(id>1)return;
    js[id].center=js[id].pos;
    js[id].min=js[id].max=js[id].pos;
    //flush_js_cali_figure();
    js_cali_fsm[id] = 1;
    //we skip center cali cmd as its no longer used.
    //cali fsm 1 now set center pos on web.
    let buf = new Uint8Array([id]);
    await fw_snd(0x06, buf);
}
export function std_input_handler(buf:Uint8Array) {
    //hori(lower 12 bit)
    //vert(higher 12 bit)
    //ljs:567 rjs:89a
    for(let id=0;id<2;++id)
    {
        let base = id * 3 + 5;
        js[id].pos.x = buf[base] + ((buf[base + 1] & 0xf) << 8);
        js[id].pos.y = (buf[base + 1] >> 4) + (buf[base + 2] << 4);
        if (js_cali_fsm[id] == 1) {
            js[id].center=js[id].pos;
            js_cali_fsm[id] = 2;
        }
        if (js_cali_fsm[id] == 2) {
            js[id].max=coord_max(js[id].max,js[id].pos);
            js[id].min=coord_min(js[id].min,js[id].pos);
        }
    }
    //flush_js_cali_figure();
}
/*btnJoystickSetCenter.onclick = async() => {
  await fw_snd(0x06,null);
}*/
export function import_config(conf_seri:string) {
    conf = JSON.parse(conf_seri);
    flush_setting();
}
export function export_config() {
    return JSON.stringify(conf);
}
export async function controller_reboot(){
    await fw_snd(0xFE, null);
}
export async function js_save_calibration(id:number){
    if(id>2)return;
    if(js_cali_fsm[id]!=2)return;
    let xpr = js[id].max.x - js[id].center.x;
    let xnr = js[id].center.x - js[id].min.x;
    let ypr = js[id].max.y - js[id].center.y;
    let ynr = js[id].center.y - js[id].min.y;
    let buf = new Uint8Array(9);
    buf[0] = xpr & 0xff;
    buf[1] = ((xpr >> 8) & 0xf) + ((ypr & 0xf) << 4);
    buf[2] = (ypr >> 4) & 0xff;

    buf[3] = js[id].center.x & 0xff;
    buf[4] = ((js[id].center.x >> 8) & 0xf) + ((js[id].center.y & 0xf) << 4);
    buf[5] = (js[id].center.y >> 4) & 0xff;

    buf[6] = xnr & 0xff;
    buf[7] = ((xnr >> 8) & 0xf) + ((ynr & 0xf) << 4);
    buf[8] = (ynr >> 4) & 0xff;
    write_erom(0x603d + id * 0x09, 9, buf);
    js_cali_fsm[id] = 0;
}
export function read_erom_handler(buf:Uint8Array) {
    let addr = buf[0] + (buf[1] << 8) + (buf[2] << 16) + (buf[3] << 24);
    let id:number=0;
    switch (addr & 0xff00) {
        case 0x6000:
            switch (addr & 0xff) {
                case 0x46:
                    id=1;
                /*fall through*/
                case 0x3d:
                    let addr2 = 0x603d + id * 0x09;
                    if (addr != addr2) return;
                    console.log("read success addr:" + addr.toString() + "|" + addr2.toString());
                    if (buf[4] != 9) return;
                    console.log("decode erom");
                    console.log(buf);
                    let base = 8;
                    base = 8;
                    js[id].center.x = buf[base] + ((buf[base + 1] & 0xf) << 8);
                    js[id].center.y = (buf[base + 1] >> 4) + (buf[base + 2] << 4);
                    base = 5;
                    js[id].max.x = buf[base] + ((buf[base + 1] & 0xf) << 8) + js[id].center.x;
                    js[id].max.y= (buf[base + 1] >> 4) + (buf[base + 2] << 4) + js[id].center.y;

                    base = 11;
                    js[id].min.x = js[id].center.x - (buf[base] + ((buf[base + 1] & 0xf) << 8));
                    js[id].min.y = js[id].center.y - ((buf[base + 1] >> 4) + (buf[base + 2] << 4));
                    js_cali_fsm[id] = 0;//we cancel cali as we sync data from controller erom.
                    //flush_js_cali_figure();
                    break;
                case 0x50:
                    controller_color[0]=u8a_to_rgb(buf.slice(5, 8));
                    controller_color[1]=u8a_to_rgb(buf.slice(8, 11));
                    controller_color[2]=u8a_to_rgb(buf.slice(11, 14));
                    controller_color[3]=u8a_to_rgb(buf.slice(14, 17));
                    //document.querySelector('#controller_color_main').value = '#' + u8a_to_hex(buf.slice(5, 8));
                    //document.querySelector('#controller_color_sub').value = '#' + u8a_to_hex(buf.slice(8, 11));
                    //document.querySelector('#controller_color_e1').value = '#' + u8a_to_hex(buf.slice(11, 14));
                    //document.querySelector('#controller_color_e2').value = '#' + u8a_to_hex(buf.slice(14, 17));
                    break;
                default:
                    break;
            }
            break;
        case 0x8000:
            switch (addr & 0xff) {
                case 0x01:
                    js[0].internal_center.x=fetch_u16(buf.slice(5, 7));
                    js[0].internal_center.y=fetch_u16(buf.slice(7, 9));
                    js[1].internal_center.x=fetch_u16(buf.slice(9, 11));
                    js[1].internal_center.y=fetch_u16(buf.slice(11, 13));
                    /*document.querySelector('#internal_lxc').innerHTML = fetch_u16(buf.slice(5, 7));
                    document.querySelector('#internal_lyc').innerHTML = fetch_u16(buf.slice(7, 9));
                    document.querySelector('#internal_rxc').innerHTML = fetch_u16(buf.slice(9, 11));
                    document.querySelector('#internal_ryc').innerHTML = fetch_u16(buf.slice(11, 13));*/
                    break;
                case 0x40:
                    //document.querySelector('#mcause').innerHTML = fetch_u32(buf.slice(5, 9));
                    //document.querySelector('#mepc').innerHTML = fetch_u32(buf.slice(9, 13));
                    break;
                case 0x09:
                    //document.querySelector('#tag').innerHTML = buf[5];
                    //document.querySelector('#tag2').innerHTML = buf[6];
                    break;
                default:
                    break;
            }
            break;
    }
}
export const read_erom = async (addr:number, size:number) => {
    let buf = new Uint8Array(5);
    buf[4] = size;//size
    for (let i = 0; i < 4; ++i) {
        buf[i] = addr & 0xff;
        addr >>= 8;
    }//addr
    await fw_snd(0x03, buf);
}
export const write_erom = async (addr:number, size:number, data:Uint8Array) => {
    let buf = new Uint8Array(5);
    buf[4] = size;
    for (let i = 0; i < 4; ++i) {
        buf[i] = addr & 0xff;
        addr >>= 8;
    }//addr
    buf =new Uint8Array([...buf, ...data]);
    await fw_snd(0x04, buf);
}
export function controller_color_save() {
    /*let buf = new Uint8Array(0x0C);
    let p = document.querySelector('#controller_color_main');
    buf[0] = parseInt(p.value.slice(1, 3), 16) & 0xff;
    buf[1] = parseInt(p.value.slice(3, 5), 16) & 0xff;
    buf[2] = parseInt(p.value.slice(5, 7), 16) & 0xff;
    p = document.querySelector('#controller_color_sub');
    buf[3] = parseInt(p.value.slice(1, 3), 16) & 0xff;
    buf[4] = parseInt(p.value.slice(3, 5), 16) & 0xff;
    buf[5] = parseInt(p.value.slice(5, 7), 16) & 0xff;
    p = document.querySelector('#controller_color_e1');
    buf[6] = parseInt(p.value.slice(1, 3), 16) & 0xff;
    buf[7] = parseInt(p.value.slice(3, 5), 16) & 0xff;
    buf[8] = parseInt(p.value.slice(5, 7), 16) & 0xff;
    p = document.querySelector('#controller_color_e2');
    buf[9] = parseInt(p.value.slice(1, 3), 16) & 0xff;
    buf[10] = parseInt(p.value.slice(3, 5), 16) & 0xff;
    buf[11] = parseInt(p.value.slice(5, 7), 16) & 0xff;*/
    let buf=new Uint8Array([...rgb_to_u8a(controller_color[0]),
    ...rgb_to_u8a(controller_color[1]),...rgb_to_u8a(controller_color[2]),
    ...rgb_to_u8a(controller_color[3])]);
    write_erom(0x6050, 0x0C, buf);
}
export function read_js_cali(id:number){
    if(id>1)return;
    let addr = 0x603d + id * 0x09;
    read_erom(addr, 9);
}
export function flush_rgb() {
    //rgb_color.value=conf.rgb_data[rgb_id.value*3]<<16+conf.rgb_data[rgb_id.value*3+1]<<8+conf.rgb_data[rgb_id.value*3+2];
    /*rgb_color.value = '#'
        + u8a_to_hex(conf.rgb_data.slice(rgb_id.value * 3, rgb_id.value * 3 + 3).reverse());
    rgb_hex.value = rgb_color.value.slice(1);*/
}/*
rgb_color.onchange = () => {
    rgb_hex.value = rgb_color.value.slice(1);
}
rgb_hex.onchange = () => {
    rgb_color.value = '#' + rgb_hex.value;
}*/
export function unpack_conf() {
    conf.config_bitmap1 = array[0];
    conf.in_interval = array[1];
    conf.out_interval = array[2];
    console.log("interval:" + conf.in_interval.toString() + "|" + conf.out_interval.toString());
    conf.hd_rumble_amp_ratio = (array.slice(3, 7));
    conf.joystick_ratio = [...(new Int8Array(array.slice(7, 11)))];
    conf.imu_sample_gap = fetch_u16(array.slice(11, 13));
    //conf.ldz = fetch_u16(array.slice(13, 15));
    //conf.rdz = fetch_u16(array.slice(15, 17));
    conf.joystick_snapback_deadzone[0] = fetch_u16(array.slice(13,15));
    conf.joystick_snapback_deadzone[1] = fetch_u16(array.slice(15,17));
    conf.joystick_snapback_filter_max_delay = fetch_u16(array.slice(17, 19));
    conf.bd_addr = (array.slice(19, 25));
    conf.imu_ratio_x = array[25];
    conf.imu_ratio_y = array[26];
    conf.imu_ratio_z = array[27];
    conf.pro_fw_version = array[28];
    conf.ns_pkt_timer_mode = array[29];
    conf.dead_zone = (array.slice(30, 34));
    conf.dead_zone_mode = array[34];
    conf.rgb_cnt = array[35];
    for(let i=0;i<conf.rgb_cnt;i++){
        conf.rgb_data[i]=u8a_to_rgb(new Uint8Array(array.slice(36+i*3,39+i*3)));
    }
}
export function put_u8(x:number)
{
    return x&0xff;
}
export function pack_conf() {
    array = [put_u8(conf.config_bitmap1), put_u8(conf.in_interval), put_u8(conf.out_interval),
    ...(new Uint8Array(conf.hd_rumble_amp_ratio)), ...(new Int8Array(conf.joystick_ratio)),
    ...put_u16(conf.imu_sample_gap),
    ...put_u16(conf.dead_zone[0]), ...put_u16(conf.dead_zone[1]),
    ...put_u16(conf.joystick_snapback_filter_max_delay),
    ...(new Uint8Array(conf.bd_addr)),
    put_u8(conf.imu_ratio_x), put_u8(conf.imu_ratio_y), put_u8(conf.imu_ratio_z),
    put_u8(conf.pro_fw_version), put_u8(conf.ns_pkt_timer_mode),
    ...(new Uint8Array(conf.dead_zone)), put_u8(conf.dead_zone_mode),
    put_u8(conf.rgb_cnt)
    ];
    conf.rgb_data.forEach(r => {
        array.push(...rgb_to_u8a(r));
    });
    console.log(conf);
}
export function flush_setting() {
    flush_rgb();
}
export function confirm_setting() {
}
export function hid_snd(id: number, buf: Uint8Array) {
    if (!(buf instanceof Array ||  buf instanceof Uint8Array)) {
        console.log("error snd buf isnt array id:" + id.toString());
        console.log(buf);
        return;
    }
    if (buf.length > 63) {
        buf = buf.slice(0, 63);
    } else if (buf.length < 63) {
        buf = new Uint8Array([...buf, ...(new Uint8Array(63 - buf.length).fill(0))]);
    }
    device.sendReport(id, buf);
}
export function fw_snd(id: number, buf: Uint8Array<ArrayBuffer> | null) {
    if (buf === null)
        buf = new Uint8Array(1).fill(0);
    if (!(buf instanceof Array || buf instanceof ArrayBuffer || buf instanceof Uint8Array)) {
        console.log("error fw buf isnt array id:" + id.toString());
        console.log(buf);
        return;
    }
    hid_snd(0xfe, new Uint8Array([id, ...buf]));
}
export const send_conf = async (save: number) => {
    try {
        if (!device?.opened) {
            throw "Device not opened";
        }
        confirm_setting();
        pack_conf();
        let buf;
        let i = 0;
        for (; (i + 1) * PAYLOAD_LENGTH <= array.length; ++i) {
            buf = new Uint8Array([i, ...array.slice(i * PAYLOAD_LENGTH, i * PAYLOAD_LENGTH + PAYLOAD_LENGTH)]);
            await fw_snd(0x02, buf);
        }
        if (PAYLOAD_LENGTH * i < array.length) {
            //buf=new Uint8Array(63).fill(0);
            buf = new Uint8Array([i, ...array.slice(PAYLOAD_LENGTH * i)]);
            if (buf.length < 63)
                buf = new Uint8Array([...buf, ...new Uint8Array(63 - buf.length).fill(0)]);
            fw_snd(0x02, buf);
            ++i;
        }
        buf = new Uint8Array([0xFF, i, save]);
        fw_snd(0x02, buf);
    } catch (error) {
        msg = `${error}\n\n`;
        alert(msg);
        console.log(msg);
    }
};
export const read_conf = async () => {
    console.log("read conf");
    try {
        if (!device?.opened) {
            throw "Device not opened";
        }
        fw_snd(0x01, null);//no payload
        fw_snd(0xFD, null);//READ STATUS
    } catch (error) {
        msg = `${error}\n\n`;
        alert(msg);
    }
};
((navigator as any) as any).hid.onconnect = (event) => {
};
(navigator as any).hid.ondisconnect = (event) => {
    if (device != null && device.vendorId == event.device.vendorId && device.productId == event.device.productId) {
        connection_status = 0;
        //connection_status_text.innerHTML = "disconnected.";
        device = null;
        alert("device unpluged!");
    }
};
export const get_fw_version = async () => {
    try {
        if (!device?.opened) {
            throw "Device not opened";
        }
        fw_snd(0xff, null);
        // 发送数据，第一个参数为reportId，填0表示不使用reportId
    } catch (error) {
        msg = `${error}\n\n`;
        alert(msg);
        console.log(msg);
    }
};
export async function open_device() {
    try {
        // requestDevice方法将显示一个包含已连接设备列表的对话框，用户选择可以并授予其中一个设备访问权限
        const devices = await (navigator as any).hid.requestDevice({ filters: [] });

        // const devices = await (navigator as any).hid.requestDevice({
        //     filters: [{
        //         vendorId: 0xabcd,  // 根据VID进行过滤
        //         productId: 0x1234, // 根据PID进行过滤
        //         usagePage: 0x0c,   // 根据usagePage进行过滤
        //         usage: 0x01,       // 根据usage进行过滤
        //     },],
        // });

        // let devices = await (navigator as any).hid.getDevices(); // getDevices方法可以返回已连接的授权过的设备列表

        if (devices.length == 0) {
            alert("No device selected.");
            return;
        }

        device = devices[0]; // 选择列表中第一个设备
        let outputDataLength:number=0;
        let inputDataLength:number=0;
        if (!device.opened) {
            // 检查设备是否打开
            await device.open(); // 打开设备

            // 下面几行代码和我的自定义的透传的HID设备有关
            // 我的设备中有一个collection，包含一个input、一个output
            // inputReports和outputReports数据是Array，reportSize是8
            // reportCount表示一包数据的字节数，USB-FS 和 USB-HS 设置的reportCount最大值不同
            if (device.collections[0].inputReports[0].items[0].isArray && device.collections[0].inputReports[0].items[0].reportSize === 8) {

                inputDataLength = device.collections[0].inputReports[0].items[0].reportCount ?? 0;
            }
            if (device.collections[0].outputReports[0].items[0].isArray && device.collections[0].outputReports[0].items[0].reportSize === 8) {
                // 发送数据包长度必须和报告描述符中描述的一致
                outputDataLength = device.collections[0].outputReports[0].items[0].reportCount ?? 0;
            }
            msg = `connected to: \n${device.productName}\nPID-${device.productId} VID-${device.vendorId}`;
            alert(msg);
            connection_status = 1;
            get_fw_version();
        }
        // await device.close(); // 关闭设备
        // await device.forget() // 遗忘设备
        function fw_packet_dispatch(id: number, buffer: Uint8Array<ArrayBufferLike>) {
            console.log("fw dispatch: 0x" + id.toString(16).padStart(2, '0'));
            switch (id) {
                case 0xFF://fw version
                    fw_version = buffer[0] * 255 + buffer[1];
                    if (fw_version < 3) {
                        alert("fw too old.");
                        device = 0;
                        connection_status = 0;
                        //connection_status_text.innerHTML = "disconnected.";
                    }
                    //document.querySelector("#fw_version").innerHTML = buffer[0].toString() + '.' + buffer[1].toString();
                    read_conf();
                    read_erom(0x603d, 0x09);
                    read_erom(0x6046, 0x09);
                    read_erom(0x8001, 0x08);
                    read_erom(0x6050, 0x0C);
                    break;
                case 0x01:
                    ofst = buffer[0];
                    if (ofst == 0xff)//confirm
                    {
                        if (red_cnt != buffer[1]) {
                            alert("read fail,data incomplete!");
                            break;
                        }
                        red_cnt = 0;
                        unpack_conf();
                        flush_setting();
                    }
                    else {
                        ofst *= PAYLOAD_LENGTH;
                        buffer = buffer.slice(1);
                        array = [...array.slice(0, ofst), ...buffer, ...array.slice(ofst + buffer.length, 128 - ofst + buffer.length)];
                        red_cnt++;
                    }
                    break;
                case 0x02:
                    if (!buffer[1])
                        break;
                    if (buffer[0] == 1) {
                        alert("save success");
                    }
                    else {
                        console.log(buffer);
                        alert("save fail");
                    }
                    break;
                case 0x05:
                    if (0 == buffer[0]) {
                        alert("calibrate success.");
                    } else {
                        alert("calibrate fail,error:" + buffer[1].toString());
                    }
                    break;
                case 0x03:
                    read_erom_handler(buffer);
                    break;
                case 0x04:
                    if (0 == buffer[0]) {
                        alert("erom write success.");
                    } else {
                        alert("erom write fail,errorcode:" + buffer[0].toString());
                    }
                    break;
                case 0x06:
                    /*if(0==buffer[0]){
                      read_js_cali();
                      if(js_cali_fsm==1)
                        js_cali_fsm=2;
                      //alert("start.");
                    }else{
                      alert("start fail,errorcode:"+buffer[0].toString());
                      js_cali_fsm=0;
                    }*/
                    break;
                case 0x07:
                    if (0 == buffer[0]) {
                        read_erom(0x8001, 8);
                        alert("reset success");
                        //reset success.
                    }
                    else {
                        alert("reset fail");
                    }
                    break;
                case 0xFD:
                    //console.log(buffer);
                    //alert(fetch_u32(buffer.slice(3,7)).toString()+"|"+fetch_u32(buffer.slice(7,11)).toString());
                    //imu_frate.innerHTML = (1.0 * fetch_u32(buffer.slice(7, 11)) / fetch_u32(buffer.slice(3, 7)) * 100).toString().slice(0, 4) + '%';
                    //imu_id.innerHTML = buffer[1].toString(16);
                    //scan_rate.innerHTML = buffer[2].toString();
                    break;
                default:
                    break;
            }
        }
        // 电脑接收到来自设备的消息回调
        device.oninputreport = (event) => {
            //console.log(event); // event中包含device、reportId、data等内容
            let buffer = new Uint8Array(event.data.buffer); // event.data.buffer就是接收到的inputreport包数据了
            switch (event.reportId) {
                case 0xFE://
                    //console.log("fw recv");
                    fw_packet_dispatch(buffer[0], buffer.slice(1));
                    break;
                case 0x30://std input report
                    std_input_handler(buffer);
                    //todo:
                    break;
                default:
                    break;
            }
        };

    } catch (error) {
        msg = `${error}\n\n`;
        alert(msg);
        console.log(msg);
    }
};
export function disconnect() {
    if (connection_status === 0) return;
    connection_status = 0;
    device.close();
    alert("device closed.")
}
// 发送数据相关操作
export function save_conf() {
    send_conf(1);
};
export function calibrate_sensor() {
    //alert("send cali");
    fw_snd(0x05, null);
}
