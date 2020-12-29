<template>
    <span>{{ date }}, {{ time }}</span>
</template>

<script>
    export default {
        name: 'CurrentTime',
        data: function(){
            return {
                date: null,
                time: null,
            }
        },
        mounted: function() {
            this.theDateTime()
            setInterval( function(){
                this.theDateTime()
            }.bind(this),1000)
            
        },
        methods: {
            theDateTime() {
                let today = new Date();
                const monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ];
                this.date = today.getDate() + ' ' + ( monthNames[today.getMonth()]) + ' ' + today.getFullYear();
                this.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            }
        }
    }
</script>

