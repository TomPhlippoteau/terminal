<template>
    <div class="terminal-container" id="terminal">
        <!-- header -->
        <div class="terminal-header">
            {{ user.name }} @ <current-time></current-time>
        </div>

        <!-- content -->
        <div class="terminal-content" id="terminal-content">
            <div>
                <div v-for="(command, index) in commands" :key="index">

                    <div class="command-line">
                        <span class="username">{{ user.name }} : </span>
                        <span class="command">{{ command.command }}</span>
                    </div>

                    <div class="command-line" v-if="command.components === 'notFound'">
                        <span class="command">Command not found</span>
                    </div>

                    <div class="command-result" v-else-if="command.components !== false">
                        <bookmarks v-if="command.components === 'bookmarks'"></bookmarks>
                        <specs v-else-if="command.components === 'specs'"></specs>
                        <help v-else-if="command.components === 'help'"></help>
                        <man v-else-if="command.components === 'man'" :command="command.command"></man>
                    </div>
                </div>
            </div>
        </div>

        <!-- footer -->
        <div class="terminal-footer">
            <form action="" name="command-me" v-on:submit.prevent="onSubmit">
                 <input v-on:keyup.up="historyPrev" 
                        v-on:keyup.down="historyNext"
                        v-model="commandType" 
                        type="text" 
                        name="commandType" ref="commandType" class="command-type">
            </form>
        </div>

    </div>
</template>

<script>

    import commandList from './class/CommandsClass'
    import Bookmarks from './components/Bookmarks.vue'
    import Help from './components/Help.vue'
    import CurrentTime from './components/CurrentTime.vue'
    import Specs from './components/Specs.vue'
    import Man from './components/Man.vue'

    export default {
        name: 'Terminal',
        components: {
        Bookmarks, Help, CurrentTime, Specs, Man
        },
        data: function() {
            return {
                commandsAvailable: commandList.commands,
                commandType: null,
                user: {
                    name: 'Tom'
                },
                history: {
                    counter: 0,
                    list: []
                },
                commands: [
                    {
                      command : "bookmarks",
                      components: "bookmarks",
                    }
                ],
            }
        },
        mounted: function() {
             this.$refs['commandType'].focus();
        },
        methods: {
            historyPrev() {
                if( ( this.history.list.length - this.history.counter ) > 0 ) {
                    this.history.counter++;
                    this.commandType =  this.history.list[ this.history.list.length - this.history.counter ];   
                }
                else {
                    this.commandType = null;
                }
            },
            historyNext() {
                if( this.history.counter <= this.history.list.length ) {
                    this.history.counter--;
                    this.commandType =  this.history.list[ this.history.list.length - this.history.counter ];   
                }
                else {
                    this.commandType = null;
                }
            },
            redirectUrl( type, data, options ) {

                let query = data.join('+')

                if( type === 'open' ) {
                    let pattern = /^((http|https):\/\/)/;
                    if(!pattern.test( query )) {
                        query = "https://" + query;
                    }
                    
                    if( query.indexOf('.') < 0 ) {
                        query = query + '.com';
                    }
                }
                else if ( ['google', 'duck'].indexOf(type) >= 0 ) {

                    if( type === "duck" )
                        query = 'https://duckduckgo.com/?q=' + query; 
                    else if( type === "google" )
                        query = 'https://www.google.fr/search?q=' + query; 
                }
                else {
                    query = null;
                }


                if( query.length > 0 ) {
                    
                    if( options.indexOf('s') > 0 ) {
                        window.open(query, "_self");
                    }
                    else {
                        window.open(query);
                    }
                    
                }

                if( options.length > 0 )
                    data.unshift( options.join('') );

                this.commands.push({
                    command: type + ' ' + data.join(' '),
                    components: false,
                });

            },
            onSubmit() {

                if( this.commandType === null )
                    return false;

                let cmd = this.commandType;

                this.history.list.push(cmd);
                let cmds = cmd.split(' ');
                
                let type = cmds.shift(); // remove command name
                let options = [];

                if( cmds[0] !== undefined && cmds[0][0] === '-' ) {
                    options = cmds[0].split('');
                    cmds.shift() // remove options
                }

               //  if( this.commandsAvailable[ type ] !== undefined && cmds.length === 0 ) {
                if( ['help', 'bookmarks', 'specs', 'man'].indexOf(type) >= 0 ) {
                    this.commands.push({
                        command: cmd,
                        components: type,
                    });
                }
                else {
                    if( cmd.indexOf(' ') > 0 ) {

                        if( ['open', 'google', 'duck'].indexOf(type) >= 0 ) {
                            this.redirectUrl( type, cmds, options );
                        }
                        else {
                            this.commands.push({
                                command: cmd,
                                components: "notFound",
                            });
                        }
                    }
                    else {
                            this.commands.push({
                                command: cmd,
                                components: "notFound",
                            });
                        }
                    
                }

                // keep scroolbar at the bottom to always show latest
                setTimeout(function(){ 
                    var messageBody = document.querySelector('#terminal-content');
                    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
                }, 100);
                
                

                this.commandType = null;
            }
        }
        
    }

</script>

<style>
  @import '../public/app.css'
</style>
