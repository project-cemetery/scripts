const spawn = require('cross-spawn');

const invoke = () => spawn.sync(
    'mrm',
    [
        'main', '--preset', '@solid-soda/scripts',
    ],
    { stdio: 'inherit' },
)


module.exports = invoke