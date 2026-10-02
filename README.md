# 24124966_calculator_frontend

Front-End and Back-End Separation Calculator System — **Frontend Project**

## Project Introduction

This is the frontend part of the "Front-End and Back-End Separation Calculator System", the first assignment of the Software Engineering course.

The front end is responsible for:
- Calculator interface display
- Button interaction and expression input
- Sending expressions to the backend via HTTP API
- Displaying the calculation results returned by the backend
- Displaying calculation history and sending history deletion requests

**The front end does not perform any calculation**: all calculations are done by the backend. The front end only collects user input, sends requests, and displays results, which satisfies the "front-end and back-end separation" requirement.

## Tech Stack

- HTML5 + CSS3 + JavaScript (native, no build tools, no framework)
- Communicates with the backend using the browser-native `fetch` API

## Runtime Environment

- Any modern browser (Chrome / Edge / Firefox / Safari)
- OS: Windows / macOS / Linux
- No dependencies to install

## Installation

This frontend project is a set of static pages, **no installation required**. Just download the whole directory.

## How to Start

### Way 1: Open Directly (Simplest)

Double-click `index.html`, and the calculator page opens in the browser.

### Way 2: Local Static Server (Optional)

```bash
# Run this in the frontend project directory (using Python's built-in module)
python -m http.server 8080
```

Then visit `http://127.0.0.1:8080`.

> In both ways, the **backend service must be running** to perform calculations.

## Configuration

The backend address is configured at the top of `calculator.js`:

```javascript
const API_BASE = "https://zlin05.pythonanywhere.com";
```

- Default: uses the deployed public backend (PythonAnywhere)
- Local development: change it to `http://127.0.0.1:5000` when the backend runs locally

## How the Front End Connects to the Back End

The front end calls the backend through HTTP requests:

| Feature | Request |
| --- | --- |
| Calculate | `POST /api/calculate` |
| Get history | `GET /api/history` |
| Delete one record | `DELETE /api/history/{id}` |
| Clear history | `DELETE /api/history` |

See the `24124966_calculator_backend` repository for the detailed API documentation.

## Features

- Basic arithmetic: addition (+), subtraction (-), multiplication (×), division (÷)
- Compound expressions: operator precedence, parentheses, unary signs (e.g., -5, 3*-2), decimals
- Calculation history: automatically saved to the backend database after each successful calculation; not lost after refreshing the page
- Delete history: delete a single record, or clear all at once
- Keyboard input: number keys, operators, Enter to calculate, Backspace to delete, Esc to clear
- Error messages: clear feedback for invalid expressions, division by zero, backend unavailable, etc.

## Directory Structure

```
24124966_calculator_frontend/
├── index.html       # Calculator page
├── style.css        # Page styles
├── calculator.js    # Interaction logic and backend communication
├── README.md        # Project documentation
└── codestyle.md     # Code style guide
```

## Code Style

The code follows the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html). See [codestyle.md](codestyle.md).
