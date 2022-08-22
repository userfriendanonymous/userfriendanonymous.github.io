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
        try {
            text = String(text);
            string = String(string);
            return string.indexOf(text) + 1;
        } catch (error) {
            return '';
        }
    }
    sliceString({string, a, b}) {
        string = String(string);
        try {
            a = Number(a);
            b = Number(b);
            return string.slice(a - 1, b > 0 ? b - 1 : string.length);
        } catch (error) {
            return '';
        }
    }
}
Scratch.extensions.register(new String());
