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
                    'opcode': 'setHost',
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
                    opcode: 'setStatus',
                    blockType: 'reporter',
                    text: 'status?',
                    arguments: {}
                }
            ]
        };
    }
    
    setHost({h}) {
        console.log(this)
        return 'f'
    }
    setStatus() {
        return this.status
    }
}
Scratch.extensions.register(new Game());
