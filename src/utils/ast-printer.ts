import {
    Expression,
    Visitor,
    Binary,
    Grouping,
    Literal,
    Unary
} from '../parser/expression';

export default class AstPrinter implements Visitor<string> {
    print(expr: Expression) {
        return expr.accept(this);
    }

    visitBinaryExpression(expr: Binary): string {
        return this.parenthesize(expr.operator.lexeme,
            expr.left, expr.right);
    }

    visitGroupingExpression(expr: Grouping): string {
        return this.parenthesize("group", expr.expression);
    }

    visitLiteralExpression(expr: Literal): string {
        if (expr.value == null) return "nil";
        return expr.value.toString();
    }

    visitUnaryExpression(expr: Unary): string {
        return this.parenthesize(expr.operator.lexeme, expr.right);
    }

    private parenthesize(name: string, ...exprs: Expression[]): string {
        let result = '(' + name;

        for (const expr of exprs) {
            result += ' ';
            result += expr.accept(this);
        }

        result += ')';

        return result;
    }
}