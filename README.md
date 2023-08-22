# Node-Express-Router Documentation

This package provides a utility for creating API routes using Express.js. It simplifies the process of defining API endpoints and handling requests through controllers.

## Installation

You can install this package using npm:

```bash
npm install @limitless.claver/node-express-router
```

## Usage
To get started, import the necessary components from the package in your entry file:

```javascript
import { Router, Controller } from "@limitless.claver/node-express-router";
```

## Getting Started
### Creating an API Resource

The `apiResource` method allows you to create a resource-based API with the specified controller and path:

```javascript
import { Router, Controller } from "@limitless.claver/node-express-router";
// Replace
// const app = express();
const app = Router.app;

const userController = new Controller(); // Your controller instance

// Create a resource-based API for users
router.apiResource("/users", userController, [/* Middleware functions */]);

```

## Adding Custom Routes
You can also add custom routes using the provided HTTP methods (`get`, `post`, `put`, `delete`):

```javascript
import { Router, Controller } from "@limitless.claver/node-express-router";

const app = Router.app;

const customController = new Controller(); // Your controller instance

// Create a custom GET route
Router.get("/custom", customController.index, [/* Middleware functions */]);

// Create a custom POST route
Router.post("/custom", customController.store, [/* Middleware functions */]);

```

## Using the Controller
Your controllers should implement the required methods to handle API requests. For example:

```javascript
// Controller.js
export class Controller {
    index(req, res, next) {
        // Handle index action
    }

    show(req, res, next) {
        // Handle show action
    }

    store(req, res, next) {
        // Handle store action
    }

    update(req, res, next) {
        // Handle update action
    }

    destroy(req, res, next) {
        // Handle destroy action
    }
}
```

## Conclusion
The Node-Express-Router Package simplifies the process of creating API routes and handling requests. With its resource-based API and custom route methods, you can easily build powerful APIs for your applications.

For more information, please refer to the [GitHub repository](https://github.com/Limitless-Kode/node-express-router) and the package's [npm page](https://www.npmjs.com/package/@limitless.claver/node-express-router).