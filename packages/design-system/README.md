# @react-component-library/ui

A React UI component library built with Vite. This package provides a collection of reusable UI components optimized for both client and server environments, and it’s designed to work seamlessly in a monorepo setup with Next.js apps.

## Overview

- **UMD, ES, & CommonJS Support:**  
  The library is built in multiple formats so you can use it in various environments.

- **TypeScript Ready:**  
  Type definitions are provided for all builds, ensuring excellent editor support and type safety.

- **Client & Server Exports:**  
  Separate entry points exist for client (`index.client`) and server (`index.server`) components.

- **Style Support:**  
  A CSS file (`ui.css`) is also exported, making it easy to include the necessary styles.

## Installation

Since this package is typically used within a monorepo, add it as a dependency in your project:

```bash
npm install @react-component-library/ui
# or
yarn add @react-component-library/ui
```

> **Note:** Make sure you have `react` and `react-dom` installed as peer dependencies.

## Usage

Import components as needed:

```jsx
// For client-side components
import { Button } from "@react-component-library/ui";

// For server-specific components
import { ServerComponent } from "@react-component-library/ui/server";

// For icons
import { Arrow } from "@react-component-library/ui/icons";

// Import the styles
import "@react-component-library/ui/ui.css";
```

When writing tailwind classes, make sure to use the `ds:` prefix:

```jsx
// Like this
<div className="ds:w-full ds:block" />

// Not this
<div className="w-full block" />
```

## Available Scripts

- **build**  
  Runs a production build using Vite, generating optimized output in the `dist` folder.

- **build:dev**  
  Builds the project in development mode (`--mode development`), useful for debugging with less optimization.

- **build:dev:watch**  
  Builds in development mode and watches for changes, automatically rebuilding the `dist` folder on file updates.

- **lint**  
  Runs ESLint to check for code quality and style issues across the project.

- **sort**  
  Automatically sorts imports in the `lib` directory using ESLint with the `simple-import-sort` rule.

- **format**  
  Formats all TypeScript, TSX, and Markdown files using Prettier.

- **preview**  
  Serves a local preview of the production build using Vite’s preview server.

- **test**  
  Runs the test suite using Vitest.

- **test:watch**  
  Runs Vitest in watch mode, automatically re-running tests when changes are detected.

- **test:coverage**  
  Runs tests and generates a coverage report with Vitest.

- **check-types**  
  Checks TypeScript types without emitting any output, ensuring type correctness.

- **clean**  
  Removes generated files and directories (like `dist`, coverage reports, and caches) to reset the workspace.

## Development

For a smooth development experience, run:

```bash
npm run build:dev:watch
```

Build the project in development mode and watch for changes, ensuring that both your JavaScript bundles and type definitions stay up to date.
