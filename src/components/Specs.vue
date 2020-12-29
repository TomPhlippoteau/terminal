<template>
    <div>
        <ul class="inlineblock ul-specs" v-for="(specs,title) in this.specs" :key="title">
            <li class="title c-primary">{{ title }}</li>

            <li class="subtitle">Components :::::</li>
            <li v-for="(spec,type) in specs.components" :key="type">
                <span class="c-secondary">{{ type }} :</span> {{ spec.brand }} {{ spec.model }}
            </li>
            <li class="subtitle">Peripherals :::::</li>
            <li v-for="(spec,type) in specs.peripherals" :key="type">
                <span class="c-secondary">{{ type }} :</span> {{ spec.brand }} {{ spec.model }}
            </li>
        </ul>
    </div>
</template>

<script>

    import specs from '../data/specs.json'

    export default {
        name: 'Specs',
        data: function(){
            return {
                specs,
            }
        },
    }
</script>

