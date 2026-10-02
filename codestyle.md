# Frontend Code Style

> **Source**: [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
> (Google's official JavaScript code style standard)

The frontend JavaScript code in this project follows the Google JavaScript Style Guide. Below are the core conventions relevant to this project.

## 1. Indentation

- Use **2 spaces** per indentation level. Tabs are not allowed.

## 2. Semicolons

- End every statement with a semicolon `;`; do not rely on automatic semicolon insertion (ASI).

## 3. Quotes

- Prefer **single quotes** `'...'` for strings to avoid unnecessary escapes.

## 4. Naming Conventions

| Object | Style | Example |
| --- | --- | --- |
| Variables | lowerCamelCase | `currentExpression` |
| Functions | lowerCamelCase | `loadHistory()` |
| Constants | UPPER_CASE with underscores | `API_BASE` |
| DOM variables | lowerCamelCase + `El` suffix | `historyListEl` |

## 5. Whitespace

- One space around operators: `a + b`
- One space after commas: `func(a, b)`
- One space after control keywords: `if (cond)`, `for (...)`

## 6. Functions

- Prefer function declarations and make the purpose of each function clear.
- Add a comment before each function describing its responsibility.
- Keep functions short and single-purpose.

## 7. String Concatenation

- Prefer template literals (backticks): `` `Record #${id} deleted` ``

## 8. Asynchronous Handling

- Use `async/await` for network requests, wrapped in `try/catch` for error handling.
- Always show user-visible error messages when a network request fails.

## 9. Comments

- Use English comments to explain logic; every key function must have a comment.

## 10. Browser Compatibility

- Use standard native APIs (`fetch`, `addEventListener`, etc.).
- Do not rely on specific frameworks or build tools.
