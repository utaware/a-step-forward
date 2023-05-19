import {Chalk} from 'chalk'

// Level	Description
// 0	All colors disabled
// 1	Basic color support (16 colors)
// 2	256 color support
// 3	Truecolor support (16 million colors)

const customChalk = new Chalk({level: 1})

export default customChalk
