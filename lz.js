class Game {
    reset() {
        this.connected = false;
        this.buff = [];
        this.world = [];
        this.host = false;
        this.players = [];
        this.openBuff = [];
        this.socket = 0;
        this.cell = 0;
        this.cellData = 0;
        this.status = '';
    }

    constructor(runtime) {
        this.name = 'player' + String(Math.round(Math.random()*8999) + 1000);
        this.serverUrl = 'wss://LifeZone.07nasp.repl.co';
        this.reset();
    }
    getInfo () {
        return {
            id: 'game',
            name: 'Game',
            blocks: [
                {
                    opcode: 'connect',
                    blockType: 'command',
                    text: 'connect',
                    arguments: {}
                },
                {
                    opcode: 'newBuff',
                    blockType: 'command',
                    text: 'new buff',
                    arguments: {}
                },
                {
                    opcode: 'addBuff',
                    blockType: 'command',
                    text: 'add to buff [data]',
                    arguments: {
                        'data': {
                            type: 'string',
                            defaultValue: 'data'
                        }
                    }
                },
                {
                    opcode: 'send',
                    blockType: 'command',
                    text: 'send',
                    arguments: {}
                },
                {
                    opcode: 'join',
                    blockType: 'command',
                    text: 'join',
                    arguments: {}
                },
                {
                    opcode: 'inspectCell',
                    blockType: 'Boolean',
                    text: 'cell [id]',
                    arguments: {
                        'id': {
                            type: 'number',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'setCellTile',
                    blockType: 'command',
                    text: 'tile [tile]',
                    arguments: {
                        'tile': {
                            type: 'number',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'setCellParameter',
                    blockType: 'command',
                    text: 'parameter [value]',
                    arguments: {
                        'value': {
                            type: 'string',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'cellTile',
                    blockType: 'reporter',
                    text: 'tile',
                    arguments: {}
                },
                {
                    opcode: 'cellParameter',
                    blockType: 'reporter',
                    text: 'parameter',
                    arguments: {}
                },
                {
                    opcode: 'addCell',
                    blockType: 'command',
                    text: 'add cell [tile] [parameter]',
                    arguments: {
                        'tile': {
                            type: 'number',
                            defaultValue: '0'
                        },
                        'parameter': {
                            type: 'string',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'clearWorld',
                    blockType: 'command',
                    text: 'clear world',
                    arguments: {}
                },
                {
                    opcode: 'openPlayerBuff',
                    blockType: 'Boolean',
                    text: 'open buff [id]',
                    arguments: {
                        'id': {
                            type: 'number',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'nextBuff',
                    blockType: 'reporter',
                    text: 'next buff',
                    arguments: {}
                },
                {
                    opcode: 'isConnected',
                    blockType: 'Boolean',
                    text: 'connected',
                    arguments: {}
                },
                {
                    opcode: 'isHost',
                    blockType: 'Boolean',
                    text: 'host',
                    arguments: {}
                },
                {
                    opcode: 'leave',
                    blockType: 'command',
                    text: 'leave',
                    arguments: {}
                },
                {
                    opcode: 'getStatus',
                    blockType: 'reporter',
                    text: 'status',
                    arguments: {}
                },
                {
                    opcode: 'getName',
                    blockType: 'reporter',
                    text: 'name',
                    arguments: {}
                },
                {
                    opcode: 'changeName',
                    blockType: 'command',
                    text: 'change name [name]',
                    arguments: {
                        'name': {
                            type: 'string',
                            defaultValue: 'name'
                        }
                    }
                },
                {
                    opcode: 'isPlayerOn',
                    blockType: 'reporter',
                    text: 'is player on [id]',
                    arguments: {
                        id: {
                            type: 'number',
                            defaultValue: '0'
                        }
                    }
                },
            ]
        };
    }
    socketSend(obj){
        this.socket.send(JSON.stringify(obj))
    }
    inspectCell({id}) {
        this.cell = id - 1;
        if (this.cell in this.world){
            this.cellData = this.world[this.cell];
            return true
        } else {
            return false
        }
    }
    cellTile() {
        return this.cellData[0];
    }
    cellParameter() {
        return this.cellData[1];
    }
    setCellTile({id}) {
        this.cellData[0] = id;
        this.world[this.cell][0] = id;
    }
    setCellParameter({value}) {
        this.cellData[1] = value;
        this.world[this.cell][1] = value;
    }
    addCell({tile, parameter}) {
        this.world.push([tile, parameter]);
    }
    clearWorld() {
        this.world = [];
    }
    join() {
        this.socketSend({'s':'room', 'name':this.name})
    }
    send() {
        this.socketSend({'s':'accept', 'buff':this.buff})
        this.buff = []
    }
    addBuff({data}) {
        this.buff[this.buff.length - 1].push(data)
    }
    newBuff() {
        this.buff.push([])
    }
    isPlayerOn({id}) {
        return id in this.players
    }
    openPlayerBuff({id}) {
        console.log(this.players)
        let buff = this.players[id]['buff']
        if (buff.length > 0) {
            this.openBuff = buff[0]
            this.players[id]['buff'].splice(0, 1)
            return true
        } else {
            return false
        }
    }
    nextBuff() {
        let val = this.openBuff[0]
        this.openBuff.splice(0, 1)
        return val
    }
    isConnected() {
        return String(this.connected)
    }
    isHost() {
        return String(this.host)
    }
    leave() {
        this.socket.close()
        this.reset()
    }
    connect() {
        this.socket = new WebSocket(this.serverUrl)
        this.socket.onopen = () => {
            this.connected = true;
        }
        this.socket.onmessage = event => {
            let data = JSON.parse(event.data);
            console.log(data)
            let s = data['s'];
            this.status = s;

            if (s == 'room'){
                this.room = data['room']

            } else if (s == 'world'){
                this.world = data['world']

            } else if (s == 'host'){
                this.host = true

            } else if (s == 'getWorld'){
                this.socketSend({'s':'world', 'world':this.world})

            } else if (s == 'accept'){
                this.players[data['id']] = {'name':data['name'], 'buff':data['buff']}

            } else if (s == 'left'){
                delete this.players[data['id']]
            }
        }
    }
    getStatus() {
        return this.status
    }
    getName() {
        return this.name
    }
    changeName({name}) {
        this.name = name
    }
}
Scratch.extensions.register(new Game());
