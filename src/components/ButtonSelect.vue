<template>
<div>
<button class='btn' :style="{background: color}">{{text}}</button>

</div>
</template>

<script>
export default {
    name: "ButtonSelect",
    props: {
        text: String,
        color: String,
    }
}
</script>