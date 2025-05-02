<template>
    <n-flex vertical>
        <n-flex justify="center">
            <h1>Index</h1>
        </n-flex>
        <n-flex justify="center">
            <n-button @click="open_device">Open</n-button>
        </n-flex>
    </n-flex>
</template>
<script lang="ts">
import {open_device,device} from './webusb'
export default{
    setup() {
        return{
            open_device,
            device,
        };
    }
}
</script>