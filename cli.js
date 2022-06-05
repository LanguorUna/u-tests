#!/usr/bin/env node
const {Runner} = require('./dist/u-tests')
/**
 * Точка входа
 */
function main() {
    // обработка входных данных
    const config = Runner.prepareConfig(process.argv);
    Runner.run(config);
}

main();