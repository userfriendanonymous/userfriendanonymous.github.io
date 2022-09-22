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
                    opcode: 'host',
                    blockType: 'Boolean',
                    text: 'host?',
                    arguments: {}
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
    
    host() {
        return this.host
    }
    status() {
        return this.status
    }
}
Scratch.extensions.register(new Game());
