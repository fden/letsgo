/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'

const debug = _debug('app:config:_base')
const config = {
    env : process.env.NODE_ENV || 'development',
    api_endpoint : ''
}


export default config