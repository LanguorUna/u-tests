#!/usr/bin/env node
const Runner = require('./dist/src/Runner')
/**
 * Точка входа
 */
function main() {
    // обработка входных данных
    const config = Runner.default.prepareConfig(process.argv);
    Runner.default.run(config);
}

main();