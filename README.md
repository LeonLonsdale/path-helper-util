# Path Helper Util

A TypeScript utility for managing and retrieving navigation paths within your application. This package allows you to define, register, and extract paths based on navigation names and groups, providing a centralised and type-safe way to handle routes.

## Table of Contents

- [Installation](#installation)
- [Introduction](#introduction)
- [Exported Types](#exported-types)
- [Exported Singleton](#exported-singleton)
- [Usage Examples](#usage-examples)
- [License](#license)

## Installation

To install the package, run:

```sh
npm install path-helper-util
```

## Introduction

This package provides a set of functions and types to manage and retrieve navigation paths for your application. By centralising path definitions, you can easily register, retrieve, and organise routes, ensuring consistency and type safety across your application.

## Exported Types

### `PathFunction`

Represents a function that returns a string path.

```typescript
type PathFunction = (...args: (string | number | undefined)[]) => string;
```

### `Path`

Represents a path object.

```typescript
interface Path {
  path: PathFunction;
  label: string;
  navs: string[];
  group?: string;
}
```

### `Paths`

Represents a collection of paths.

```typescript
interface Paths {
  [key: string]: Path;
}
```

### `NavLink`

Represents a navigation link.

```typescript
interface NavLink {
  path: PathFunction;
  label: string;
  group?: string;
}
```

## Exported Singleton

### `pathHelper`

A singleton instance of the `PathHelperUtil` class to manage and retrieve navigation paths.

#### Methods

- `registerPath(key: string, pathFunction: PathFunction, label: string, navs: string[], group?: string): void`

  Registers a new path.

- `extractNavLinks(navName: string): NavLink[]`

  Extracts paths that belong to a specified navigation name.

- `extractGroupPaths(groupName: string): NavLink[]`

  Extracts paths that belong to a specified group name.

- `getPath(key: string): NavLink | undefined`

  Retrieves the path object for the specified key.

- `getPaths(): Paths`

  Retrieves a copy of the paths object.

## Usage Examples

### Registering a Path

To register a new path, use the `registerPath` method. The example below demonstrates the registration of a userSettings path that could be used to create a Profile or Settings link within the project. When registering, we specify that the return path function expects to receive the userId. We also state that the link will be used in the `main` navigation list, and that it's part of the `user` group.

Setting descriptive navigation lists and groups can help to create navigation lists using the `extractNavLinks` and `extractGroupPaths` methods.

```typescript
import { pathHelper } from "path-helper-util";

pathHelper.registerPath(
  "userSettings",
  (userId: string) => `/user/${userId}/settings`,
  "User Settings",
  ["main"],
  "user"
);
```

### Extracting Paths by Navigation Name

To extract paths by a specific navigation name, use the `extractNavLinks` method. For example:

```typescript
const mainNavLinks = pathHelper.extractNavLinks("main");
mainNavLinks.map((link) => (
  <li key={link.label}>
    <Link href={link.path()}>{link.label}</Link>
  </li>
));
```

### Extracting Paths by Group Name

To extract paths by a specific group name, use the `extractGroupPaths` method. For example:

```typescript
const userPaths = pathHelper.extractGroupPaths("user");
userPaths.map((link) => (
  <li key={link.label}>
    <Link href={link.path()}>{link.label}</Link>
  </li>
));
```

### Retrieving a Single Path

To retrieve a single path by its key, use the `getPath` method. For example:

```typescript
const userSettingsPath = pathHelper.getPath("userSettings");

<Link href={userSettingsPath.path()}>{userSettingsPath.label}</Link>;
```

### Retrieving All Paths

To retrieve a copy of the `paths` object, use the `getPaths` method. For example:

```typescript
const allPaths = pathHelper.getPaths();
console.log(allPaths);
```

## License

This module is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
