import { Token, TokenType } from '../lexer';
import Expression, { Binary } from './expression';

export default class Parser {
    tokens: Token[];
    current: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    private expression(): Expression {
        return this.equality();
    }

    private equality(): Expression {
        let expr = this.comparison();

        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            const operator = this.previous();
            const right = this.comparison();
            expr = new Binary(expr, operator, right);
        }

        return expr;
    }

    private comparison(): Expression {
        let expr = this.term();

        while (this.match(GREATER, GREATER_EQUAL, LESS, LESS_EQUAL)) {
            const operator = this.previous();
            const right = this.term();
            expr = new Binary(expr, operator, right);
        }

        return expr;
    }

    private term(): Expression {
        let expr = factor();

        while (match(MINUS, PLUS)) {
            const operator = this.previous();
            const right = this.factor();
            expr = new Binary(expr, operator, right);
        }

        return expr;
    }

    private factor(): Expression {
        let expr = unary();

        while (match(SLASH, STAR)) {
            Token operator = previous();
            Expr right = unary();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (check(type)) {
                advance();
                return true;
            }
        }

        return false;
    }

    private isAtEnd(): boolean {
        return this.peek().type === TokenType.EOF;
    }

    private check(type: TokenType) {
        if (isAtEnd()) return false;
        return peek().type === type;
    }

    private advance(): Token {
        if (!isAtEnd()) this.current++;
        return this.previous();
    }

    private peek(): Token {
        return this.tokens[this.current];
    }

    private previous(): Token {
        return this.tokens[this.current - 1];
    }
}