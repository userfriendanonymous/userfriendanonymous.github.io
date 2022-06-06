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
                }
                // }, {
                //     opcode: 'adevent',
                //     blockType: Scratch.BlockType.HAT,
                //     text: 'on ad [event]',
                //     arguments: {
                //         event: {
                //             type: ArgumentType.NUMBER,
                //             menu: 'event'
                //         }
                //     }
                // }
            ]
            // menus: {
            //     event: {
            //         items: ['start', 'end', 'error']
            //     }
            // }
        };
    }
    requestad() {
    }
    addisplayed() {
        return 0;
    }
    // adevent(event) {

    // }
}
Scratch.extensions.register(new CrazyGamesAds());