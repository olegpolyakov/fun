import { Token } from '../lexer';

export interface Visitor<T> {
    visitUnaryExpression(expression: Unary): T;
    visitBinaryExpression(expression: Binary): T;
    visitLiteralExpression(expression: Literal): T;
    visitGroupingExpression(expression: Grouping): T;
}

export abstract class Expression {
    static Unary: Function;
    static Binary: Function;
    static Literal: Function;
    static Grouping: Function;

    abstract accept<T>(visitor: Visitor<T>): T;
}

export class Unary extends Expression {
    operator: Token;
    right: Expression;

    constructor(operator: Token, right: Expression) {
        super();
        this.operator = operator;
        this.right = right;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitUnaryExpression(this);
    }
}

export class Binary extends Expression {
    left: Expression;
    operator: Token;
    right: Expression;

    constructor(left: Expression, operator: Token, right: Expression) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitBinaryExpression(this);
    }
}

export class Literal extends Expression {
    value: any;

    constructor(value: any) {
        super();
        this.value = value;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitLiteralExpression(this);
    }
}

export class Grouping extends Expression {
    expression: Expression;

    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitGroupingExpression(this);
    }
}

export default Expression;