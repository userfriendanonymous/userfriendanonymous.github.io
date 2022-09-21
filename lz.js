class Game {
    constructor() {
        this.name = 'player';
        this.serverUrl = 'https://LifeZone.07nasp.repl.co';
        this.reset();
        this.socket.onopen = event => {
            this.connected = true;
        }
        this.socket.onmessage = event => {
            data = event.data;
            s = data['s'];
            this.status = s;

            if (s == 'room'){
                this.room = data['room']

            } else if (s == 'world'){
                this.world = data['world']

            } else if (s == 'host'){
                this.host = true

            } else if (s == 'getWorld'){
                this.socket.send({'s':'world', 'world':this.world})

            } else if (s == 'accept'){
                this.players[data['id']] = {'name':data['name'], 'buff':data['buff']}
            }
        }
    }
    reset() {
        this.connected = false;
        this.buff = [];
        this.world = [];
        this.host = false;
        this.players = 0;
        this.openBuff = [];
        this.socket = 0;
        this.cell = 0;
        this.cellData = 0;
        this.status = '';
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
                    opcode: 'cell',
                    blockType: 'command',
                    text: 'cell [id]',
                    arguments: {
                        'id': {
                            type: 'number',
                            defaultValue: 0
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
                            defaultValue: 0
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
                            defaultValue: 0
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
                    opcode: 'openBuff',
                    blockType: 'boolean',
                    text: 'open buff [id]',
                    arguments: {
                        'id': {
                            type: 'number',
                            defaultValue: 0
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
                    opcode: 'connected',
                    blockType: 'boolean',
                    text: 'connected?',
                    arguments: {}
                },
                {
                    opcode: 'host',
                    blockType: 'boolean',
                    text: 'host?',
                    arguments: {}
                },
                {
                    opcode: 'leave',
                    blockType: 'command',
                    text: 'leave',
                    arguments: {}
                },
                {
                    opcode: 'status',
                    blockType: 'reporter',
                    text: 'status',
                    arguments: {}
                },
            ]
        };
    }
    cell({id}) {
        this.cell = id - 1;
        this.cellData = this.world[id];
    }
    cellTile({}) {
        return this.cellData[0];
    }
    cellParameter({}) {
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
        this.world.append([tile, parameter]);
    }
    clearWorld({}) {
        this.world.clear();
    }
    join({}) {
        socket.send({'s':'room', 'name':this.name});
    }
    send({}) {
        socket.send({'s':'accept', 'buff':this.buff})
        this.buff = []
    }
    addBuff({data}) {
        this.buff[this.buff.length - 1].append(data)
    }
    newBuff({}) {
        this.buff.append([])
    }
    openBuff({id}) {
        buff = this.players[id]['buff']
        if (buff.length > 0) {
            this.openBuff = buff[0]
            delete this.players[id]['buff'][0]
            return true
        } else {
            return false
        }
    }
    nextBuff({}) {
        val = this.openBuff[0]
        delete this.openBuff[0]
    }
    connected({}) {
        return this.connected
    }
    host({}) {
        return this.host
    }
    leave({}) {
        this.socket.close()
        this.reset()
    }
    connect({}) {
        this.socket = new WebSocket(this.serverUrl)
    }
    status({}) {
        return this.status
    }
}
Scratch.extensions.register(new Game());
