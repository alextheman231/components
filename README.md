# @alextheman/components

![npm version](https://img.shields.io/npm/v/@alextheman/components)
![npm downloads](https://img.shields.io/npm/dm/@alextheman/components)
![npm license](https://img.shields.io/npm/l/@alextheman/components)

[![CI](https://github.com/alextheman231/components/actions/workflows/ci.yml/badge.svg)](https://github.com/alextheman231/components/actions/workflows/ci.yml)
[![Publish to NPM Registry and GitHub Releases/Pages](https://github.com/alextheman231/components/actions/workflows/publish.yml/badge.svg)](https://github.com/alextheman231/components/actions/workflows/publish.yml)


This is a React component library used across my projects. It is built with React and Material UI, and integrates with tools such as react-router-dom (soon to be replaced with Wouter) and react-hook-form (soon to be replaced with TanStack Form).

## Installation

To install this into your project, you can do so with the following command:

```bash
npm install @alextheman/components
```

From there, you may import any of the package's components. If you're using this package in your own components package, you may need to install it as a peer dependency in order for contexts to work properly.

```bash
npm install --save-peer @alextheman/components
```

## Quick start

You can import and use any component from the package in the following way:

```tsx
import { ExternalLink } from "@alextheman/components";

function MyComponent() {
  return (
    <ExternalLink href="https://alextheman231.github.io/components/">
      Link to documentation
    </ExternalLink>
  );
}
```

## Documentation

The hosted documentation site uses Storybook to provide interactive demos and general documentation of the features of the package. It can be found [here](https://alextheman231.github.io/components/).

See the GitHub repository [here](https://github.com/alextheman231/components).
