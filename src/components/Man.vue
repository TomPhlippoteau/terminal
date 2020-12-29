<template>
    <div>
        <ul class="c-help" v-if="man !== null">
            <li class="title c-primary">{{ man.command }} </li>
            <li class="subtitle">{{ man.description }}</li>
            <li v-for="(opt,index) in man.options" :key="index">
                <span>-{{ opt.opt }}</span> : <span class="c-secondary">{{ opt.man }}</span></li>
        </ul>
        <ul class="c-help" v-else>
            <li class="title">This command does not exist</li>
        </ul>
    </div>
</template>

<script>

    import commandList from '../class/CommandsClass'

    export default {
        name: 'Man',
        props: ['command'],
        data: function(){
            return {
                commands: commandList.commands,
                man: null,
            }
        },
        mounted: function() {

            let key = this.command.replace('man ', '');

            this.man = this.commands[ key ] === undefined ? null : this.commands[ key ];
        }
    }
</script>

