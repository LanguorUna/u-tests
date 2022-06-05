"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterEach = exports.beforeEach = exports.after = exports.before = exports.test = exports.it = exports.suite = exports.describe = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const GroupTest_1 = __importDefault(require("./GroupTest"));
const Test_1 = __importDefault(require("./Test"));
class Loader {
    /**
     * Получить все скрипты тестов относительно рабочей директории
     * @param paths
     * @param scripts
     * @returns
     */
    static getAllScripts(paths, scripts) {
        scripts = scripts || [];
        for (const dirOrFile of paths) {
            const resolvedPath = path_1.default.resolve(process.cwd(), dirOrFile);
            if (fs_1.default.statSync(resolvedPath).isDirectory()) {
                const files = fs_1.default.readdirSync(resolvedPath)
                    .map((file) => path_1.default.join(resolvedPath, file));
                Loader.getAllScripts(files, scripts);
            }
            else if (resolvedPath.endsWith('.test.js')) {
                scripts.push(resolvedPath);
            }
        }
        return scripts;
    }
    static loadScripts(scripts) {
        // корневая группа
        const root = new GroupTest_1.default();
        Loader._currentGroup = root;
        for (const script of scripts) {
            Loader._currentFile = script;
            require(script);
        }
        return root;
    }
    static loadGroupTest(title, groupBody) {
        const parent = Loader._currentGroup;
        const group = new GroupTest_1.default(title, parent, Loader._currentFile);
        Loader._currentGroup = group;
        groupBody();
        Loader._currentGroup = parent;
    }
    static loadTest(title, testBody) {
        Loader._currentGroup.addTest(new Test_1.default(title, testBody, Loader._currentFile));
    }
    static addHandler(handlerType, handler) {
        Loader._currentGroup.addHandler(handlerType, handler);
    }
}
exports.default = Loader;
exports.describe = Loader.loadGroupTest;
exports.suite = Loader.loadGroupTest;
exports.it = Loader.loadTest;
exports.test = Loader.loadTest;
exports.before = Loader.addHandler.bind(Loader, 'before');
exports.after = Loader.addHandler.bind(Loader, 'after');
exports.beforeEach = Loader.addHandler.bind(Loader, 'beforeEach');
exports.afterEach = Loader.addHandler.bind(Loader, 'afterEach');
//# sourceMappingURL=Loader.js.map