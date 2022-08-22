class String {
    getInfo () {
        return {
            id: 'string',
            name: 'String',
            blocks: [
                {
                    opcode: 'findChar',
                    blockType: 'reporter',
                    text: 'find [text] in [string]',
                    arguments: {
                        text: {
                            type: 'string',
                            defaultValue: ''
                        },
                        string: {
                            type: 'string',
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'sliceString',
                    blockType: 'reporter',
                    text: 'slice [string] from [a] to [b]',
                    arguments: {
                        string: {
                            type: 'string',
                            defaultValue: ''
                        },
                        a: {
                            type: 'number',
                            defaultValue: ''
                        },
                        b: {
                            type: 'number',
                            defaultValue: ''
                        }
                    }
                }
            ]
        };
    }
    findChar({text, string}) {
        return string.indexOf(text) + 1;
    }
    sliceString({string, a, b}) {
        return string.slice(a - 1, b > 0 ? b - 1 : string.length);
    }
}
Scratch.extensions.register(new String());
