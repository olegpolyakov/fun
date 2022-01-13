import { readFileSync } from 'fs';

import Lexer from './lexer';

const args = process.argv;

if (args.length === 2) {
    runPrompt();
} else if (args.length === 3) {
    run(args[2]);
} else if (args.length === 4) {
    runFile(args[3]);
}

export function run(code: string) {
    const lexer = new Lexer(code);
    const tokens = lexer.lex();

    for (const token of tokens) {
        console.log(token);
    }
}

export function runFile(path: string) {
    const buffer = readFileSync(path);
    run(buffer.toString());
}

export function runPrompt() {
    process.stdin.on('data', data => {
        const line = data.toString();

        if (line === '') return;

        run(line);
    });
}

export function error(line: number, message: string) {
    report(line, '', message);
}

export function report(line: number, where: string, message: string) {
    console.error(`line ${line} Error${where}: ${message}`);
}