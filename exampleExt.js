class Game {
    constructor() {
        this.host = false;
        this.status = 'status'
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
        return 'f'
    }
    status() {
        return this.status
    }
}
Scratch.extensions.register(new Game());
