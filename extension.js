class CrazyGamesAds {
    constructor() { }
    getInfo() {
        return {
            id: 'crazygamesads',
            name: 'CrazyGames Ads',
            color1: '#8BC34A',
            color2: '#7CB342',
            color3: '#689F38',
            blocks: [
                {
                    opcode: 'requestad',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'request ad'
                }, {
                    opcode: 'addisplayed',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'ad displayed?'
                }, {
                    opcode: 'adstart',
                    blockType: Scratch.BlockType.HAT,
                    text: 'when ad starts',
                }, {
                    opcode: 'adend',
                    blockType: Scratch.BlockType.HAT,
                    text: 'when ad ends',
                }, {
                    opcode: 'aderror',
                    blockType: Scratch.BlockType.HAT,
                    text: 'when ad errors',
                }
            ]
            // menus: {
            //     event:
            //         ['start', 'end', 'error']
            // }
        };
    }
    requestad() {
    }
    addisplayed() {
        return 0;
    }
    adstart() {
        return 0;
    }
    adend() {
        return 0;
    }
    aderror() {
        return 0;
    }
}
Scratch.extensions.register(new CrazyGamesAds());