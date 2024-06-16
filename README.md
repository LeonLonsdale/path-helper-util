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

To register a new path, use the `registerPath` method.

This method has the following signature:

`registerPath(key: string, pathFunction: PathFunction, label: string, navs: string[], group?: string): void`

- `key` is your identifier within the paths object that this utility uses to manage your paths. You can use it to get the path later using `getPath('key')`.
- `pathFunction` is a callback that returns the path. This can accept data for dynamic routes.
- `label` is the text that you can use in your links later.
- `navs` accepts `string[]`. These are the names of your navigations such as `mainNav`, `sidebar`, etc., You can use these navigation names in `extractNavLinks()` to create an array of path to create your nav list.
- `group?` is optional, but is used to categorise your paths. For example you may have `/blog`, `/blog/[id]`, `/blog/new`. The group allows you to get a list of paths within this group category using `extractGroupPaths()`.

Setting descriptive navigation lists and groups can help to create navigation lists using the `extractNavLinks` and `extractGroupPaths` methods.

```typescript
import { pathHelper } from "path-helper-util";

// static path
pathHelper.registerPath("home", () => "/", "Home", ["main"]);

// dynamic
pathHelper.registerPath(
  "profile",
  (userId: string) => `/user/${userId}`,
  "Profile",
  ["main"],
  "user"
);
```

When registering your paths we need to ensure the `registerPath` calls are executed.

We have a few ways to do this:

#### Register Calls in the root Layout.tsx

```typescript
export default function Layout({ children }) {
  pathHelper.registerPath("home", () => "/", "Home", ["main"]);
  // ...
}
```

#### Dynamically Import a Registrations File

We can also create a new path registration file, such as `lib/path-registration.ts`. We put all of our `registerPath` calls in there, and then dynamically import it.

```typescript
// lib/paths-registration.tsx
import { pathHelper } from "path-helper-util";

pathHelper.registerPath("home", () => "/", "Home", ["main"]);
// ...

// layout.tsx
// note: the layout must be async.
export default async function Layout({ children }) {
  await import("@/lib/path-registration")
    .then(() => {
      console.log("Path registrations have been loaded.");
      console.log("Registered paths:", pathHelper.getPaths());
    })
    .catch((error) => {
      console.error("Error loading path registrations:", error);
    });
}
```

or we can create and call a registration function:

```typescript
// layout.tsx
async function registerPaths() {
  try {
    await import("@/lib/path-registration");
    console.log("Path registrations have been loaded.");
  } catch (error) {
    console.error("Error loading path registrations:", error);
  }
}

registerPaths().then(() => {
  // Example usage of the pathHelper
  console.log("Registered paths:", pathHelper.getPaths());
});

export default function Layout({ children }) {
  //...
}
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
