import * as t from './types'

const updateMessage = ({ content , state }) => ({
    type: t.UPDATE_MESSAGE,
    payload : { content , state }
})

export { updateMessage }