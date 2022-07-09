class cursor {
    constructor() { }
    getInfo() {
        return {
            id: 'cursor',
            name: 'Cursor',
            color1: '#8BC34A',
            color2: '#7CB342',
            color3: '#689F38',
            blocks: [
                {
                    opcode: 'cursormode',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'cursor mode [mode]',
                    arguments: {
                        mode: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'mode',
                            defaultValue: 'pointer'
                        }
                    }
                }
            ],
            menus: {
                mode: {
                    items: ['pointer', 'normal']
                }
            }
        };
    }
    cursormode(mode) {
        document.querySelector('canvas').style.cursor = mode;
    }
}
Scratch.extensions.register(new cursor());
