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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateGuess = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class FileWordValidator {
    constructor(filePath) {
        this.filePath = filePath;
        this.validateWord = (guess) => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const file = yield fs_1.promises.open(this.filePath);
            try {
                try {
                    for (var _d = true, _e = __asyncValues(file.readLines()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                        _c = _f.value;
                        _d = false;
                        const word = _c;
                        if (word.toUpperCase() === guess)
                            return true;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return false;
            }
            finally {
                file.close();
            }
        });
    }
}
const getSolution = () => __awaiter(void 0, void 0, void 0, function* () {
    return "BAGEL";
});
const getColors = (guess) => __awaiter(void 0, void 0, void 0, function* () {
    const guessColors = Array(5).fill("lightslategrey");
    const keyColors = {};
    const solution = (yield getSolution()).split("");
    // Green pass
    for (let i = 0; i < 5; ++i) {
        keyColors[guess[i]] = "lightslategrey";
        if (guess[i] === solution[i]) {
            guessColors[i] = "green";
            keyColors[guess[i]] = "green";
            solution[i] = "";
        }
    }
    // Yellow pass   
    for (let i = 0; i < 5; ++i) {
        if (solution.includes(guess[i])) {
            guessColors[i] = "goldenrod";
            keyColors[guess[i]] = keyColors[guess[i]] !== "green" ? "goldenrod" : "green";
            solution[solution.indexOf(guess[i])] = "";
        }
    }
    return { guessColors, keyColors };
});
const evaluateGuess = (guess) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(process.cwd(), "data/wordle-answers-alphabetical.txt");
    const validator = new FileWordValidator(filePath);
    const accepted = yield validator.validateWord(guess);
    const { guessColors, keyColors } = accepted ? yield getColors(guess) : { guessColors: null, keyColors: null };
    return {
        accepted,
        guessColors,
        keyColors
    };
});
exports.evaluateGuess = evaluateGuess;