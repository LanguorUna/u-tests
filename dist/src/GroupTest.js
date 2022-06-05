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
Object.defineProperty(exports, "__esModule", { value: true });
class GroupTest {
    constructor(title, parent, file) {
        this._groups = [];
        this._tests = [];
        this.beforeGroupHandlers = [];
        this.afterGroupHandlers = [];
        this.beforeTestHandlers = [];
        this.afterTestHandlers = [];
        this.file = file;
        this.title = title;
        if (parent) {
            parent.addGroup(this);
            this.beforeTestHandlers = [...parent.beforeTestHandlers];
            this.afterTestHandlers = [...parent.afterTestHandlers];
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this._runHandlers('before');
            this._tests.forEach((test) => __awaiter(this, void 0, void 0, function* () {
                this._runHandlers('beforeEach');
                yield test.run();
                this._runHandlers('afterEach');
            }));
            yield Promise.all(this._groups.map((group) => __awaiter(this, void 0, void 0, function* () { return yield group.run(); })));
            this._runHandlers('after');
        });
    }
    getResults() {
        const results = [];
        let testsCount = this._tests.length;
        let successCount = 0;
        let testResult;
        this._tests.forEach((test) => {
            var _a;
            testResult = test.getResult();
            if ((_a = testResult.result) === null || _a === void 0 ? void 0 : _a.successful) {
                successCount += 1;
            }
            results.push(testResult);
        });
        let groupResult;
        this._groups.forEach((group) => {
            groupResult = group.getResults();
            results.push(groupResult);
            testsCount += groupResult.testsCount;
            successCount += groupResult.successCount;
        });
        return {
            isGroup: true,
            title: this.title,
            file: this.file,
            testsCount,
            successCount,
            results
        };
    }
    getTestsCount() {
        let testsCount = this._tests.length;
        this._groups.forEach((group) => {
            testsCount += group.getTestsCount();
        });
        return testsCount;
    }
    getSuccessTestCount() {
        let successCount = this._tests.reduce((count, test) => {
            var _a;
            return ((_a = test.getResult().result) === null || _a === void 0 ? void 0 : _a.successful) ? count + 1 : count;
        }, 0);
        this._groups.forEach((group) => {
            successCount += group.getSuccessTestCount();
        });
        return successCount;
    }
    addGroup(group) {
        this._groups.push(group);
    }
    addTest(test) {
        this._tests.push(test);
    }
    addHandler(handlerType, handler) {
        switch (handlerType) {
            case 'before':
                this.beforeGroupHandlers.push(handler);
                break;
            case 'after':
                this.afterGroupHandlers.push(handler);
                break;
            case 'beforeEach':
                this.beforeTestHandlers.push(handler);
                break;
            case 'afterEach':
                this.afterTestHandlers.push(handler);
                break;
        }
    }
    _runHandlers(handlerType) {
        let handlers;
        switch (handlerType) {
            case 'before':
                handlers = this.beforeGroupHandlers;
                break;
            case 'after':
                handlers = this.afterGroupHandlers;
                break;
            case 'beforeEach':
                handlers = this.beforeTestHandlers;
                break;
            case 'afterEach':
                handlers = this.afterTestHandlers;
                break;
        }
        handlers.forEach((handler) => {
            handler();
        });
    }
}
exports.default = GroupTest;
//# sourceMappingURL=GroupTest.js.map