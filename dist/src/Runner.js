"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlReporter_1 = __importDefault(require("./HtmlReporter"));
const JsonReporter_1 = __importDefault(require("./JsonReporter"));
const Loader_1 = __importDefault(require("./Loader"));
const TextReporter_1 = __importDefault(require("./TextReporter"));
class Runner {
    static prepareConfig(args) {
        if (args.length < 3) {
            throw 'Не указаны пути к тестам';
        }
        // 0-й аргумент node.exe
        const config = {
            paths: args[2].split(',').map((path) => path.trim()),
            console: true
        };
        let arg;
        let prevKey;
        for (let i = 3; i < args.length; i++) {
            arg = args[i];
            switch (arg) {
                case '--json':
                    config.json = {};
                    prevKey = '--json';
                    break;
                case '--html':
                    config.html = {};
                    prevKey = '--html';
                    break;
                case '--txt':
                    config.txt = {};
                    prevKey = '--txt';
                    break;
                case '--noConsole':
                    config.console = false;
                    break;
                default:
                    if (prevKey) {
                        config[prevKey].filePath = arg;
                    }
            }
        }
        return config;
    }
    static run(config = { paths: [] }) {
        return __awaiter(this, void 0, void 0, function* () {
            const testFiles = Loader_1.default.getAllScripts(config.paths);
            const rootGroup = Loader_1.default.loadScripts(testFiles);
            yield rootGroup.run();
            const results = rootGroup.getResults();
            if (config.console) {
                console.log(TextReporter_1.default.render(results));
            }
            if (config.json) {
                JsonReporter_1.default.writeReportFile(results, config.json.filePath);
            }
            if (config.html) {
                HtmlReporter_1.default.writeReportFile(results, config.html.filePath);
            }
            if (config.txt) {
                TextReporter_1.default.writeReportFile(results, config.txt.filePath);
            }
            return results;
        });
    }
}
exports.default = Runner;
//# sourceMappingURL=Runner.js.map