import { Path, Paths, PathFunction, NavLink } from "./types";

/**
 * Utility class for managing paths and navigation links.
 */
class PathHelperUtil {
  private paths: Paths = {};

  /**
   * Checks if the given object is a valid Path.
   * @param obj - The object to check.
   * @returns True if the object is a valid Path, false otherwise.
   */
  private isPath(obj: any): obj is Path {
    return (
      obj &&
      typeof obj === "object" &&
      "path" in obj &&
      "label" in obj &&
      "navs" in obj
    );
  }

  /**
   * Registers a new path.
   * @param key - The key to identify the path.
   * @param pathFunction - The function that generates the path.
   * @param label - The label for the path.
   * @param navs - An array of navigation names associated with the path.
   * @param group - The group name for the path.
   */
  registerPath(
    key: string,
    pathFunction: PathFunction,
    label: string,
    navs: string[] = [],
    group?: string
  ): void {
    this.paths[key] = {
      path: pathFunction,
      label: label,
      navs: navs,
      group: group,
    };
  }

  /**
   * Extracts an array of NavLink objects associated with the given navigation name.
   * @param navName - The navigation name.
   * @returns An array of NavLink objects.
   */
  extractNavLinks(navName: string): NavLink[] {
    return Object.values(this.paths)
      .filter(this.isPath)
      .filter((pathObj) => pathObj.navs.includes(navName))
      .map((pathObj) => ({
        path: pathObj.path,
        label: pathObj.label,
        group: pathObj.group,
      }));
  }

  /**
   * Extracts an array of NavLink objects associated with the given group name.
   * @param groupName - The group name.
   * @returns An array of NavLink objects.
   */
  extractGroupPaths(groupName: string): NavLink[] {
    return Object.values(this.paths)
      .filter(this.isPath)
      .filter((pathObj) => pathObj.group === groupName)
      .map((pathObj) => ({
        path: pathObj.path,
        label: pathObj.label,
        group: pathObj.group,
      }));
  }

  /**
   * Retrieves the NavLink object associated with the given key.
   * @param key - The key of the path.
   * @returns The NavLink object, or undefined if not found.
   */
  getPath(key: string): NavLink | undefined {
    const pathObj = this.paths[key];
    if (this.isPath(pathObj)) {
      return {
        path: pathObj.path,
        label: pathObj.label,
        group: pathObj.group,
      };
    }
    return undefined;
  }

  /**
   * Retrieves a copy of all registered paths.
   * @returns An object containing all registered paths.
   */
  getPaths(): Paths {
    return { ...this.paths };
  }
}

const pathHelper = new PathHelperUtil();
export default pathHelper;
