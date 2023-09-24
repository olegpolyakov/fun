const Expression = require('./lib/parser/expression');
const { Token, TokenType } = require('./lib/lexer/token');
const AstPrinter = require('./lib/utils/ast-printer').default;

const expression = new Expression.Binary(
    new Expression.Unary(
        new Token(TokenType.MINUS, '-', null, 1),
        new Expression.Literal(123),
    ),
    new Token(TokenType.STAR, '*', null, 1),
    new Expression.Grouping(
        new Expression.Literal(45.67)
    )
);

console.log(new AstPrinter().print(expression));