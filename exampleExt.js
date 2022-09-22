class Game {
    constructor() {
        this.host = false;
        this.status = 'status'
        console.log(this)
    }
    getInfo () {
        return {
            id: 'game',
            name: 'Game',
            blocks: [
                {
                    'opcode': 'host',
                    'blockType': 'Boolean',
                    'text': 'host [h]',
                    'arguments': {
                        'h':{
                            type:'string',
                            defaultValue:'7'
                        }
                    }
                },
                {
                    opcode: 'status',
                    blockType: 'reporter',
                    text: 'status?',
                    arguments: {}
                }
            ]
        };
    }
    
    host({h}) {
        console.log(this)
        return 'f'
    }
    status() {
        return this.status
    }
}
Scratch.extensions.register(new Game());
