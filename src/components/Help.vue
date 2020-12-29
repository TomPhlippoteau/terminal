<template>
    <div>
        <ul class="c-help">
            <li v-for="(command,key) in this.commands" :key="key">
                <span class="main">{{ command.command }}</span>
                <span class="c-secondary">{{ command.description }}</span>
            </li>
        </ul>
    </div>
</template>

<script>

    import commandList from '../class/CommandsClass'

    export default {
        name: 'Help',
        data: function(){
            return {
                commands: commandList.commands,
            }
        },
    }
</script>

