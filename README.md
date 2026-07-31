# Jain Foods

## Home Page Blueprint

The home page follows this component structure:

```text
Home Page
├── Header
│   ├── Logo
│   └── Navigation Items
├── Body
│   ├── Search Bar
│   └── Restaurant Container
│       └── Restaurant Card
│           ├── Image
│           ├── Restaurant Name
│           ├── Star Rating
│           ├── Cuisines
│           └── Distance
└── Footer
    ├── Copyright
    ├── Links
    ├── Address
    └── Contact Information
```

## Topic Notes

### Export and Import

JavaScript supports two types of exports and imports.

#### Default Export and Import

Use a default export when a file exposes one primary component or value.

```javascript
// Export
export default Component;

// Import
import Component from "../../abc";
```

#### Named Export and Import

Use named exports when a file exposes multiple components, functions, or constants.

```javascript
// Export
export const Component = /* component definition */;

// Import
import { Component } from "../../abc";
```

### React Hooks

React Hooks are utility functions provided by the React library. They let function
components use React features such as state and lifecycle behavior.

Common hooks include:

- `useState()`
- `useEffect()`
