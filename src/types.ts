/**
 * Represents a function that returns a string path.
 */
type PathFunction = (...args: (string | number | undefined)[]) => string;

/**
 * Represents a path object.
 */
interface Path {
  path: PathFunction;
  label: string;
  navs: string[];
  group?: string;
}

/**
 * Represents a collection of paths.
 */
interface Paths {
  [key: string]: Path;
}

/**
 * Represents a navigation link.
 */
interface NavLink {
  path: PathFunction;
  label: string;
  group?: string;
}

export { PathFunction, Path, Paths, NavLink };
