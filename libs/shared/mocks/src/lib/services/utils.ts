/*EXAMPLE 
const url = '/api/users/123';
const prefix = 'api/users'; */
export const createRegexForLastPart = (prefix: string) => {
  const regexPattern = `/${prefix}/([^/]+)$`;
  return new RegExp(regexPattern);
};

//exatract all the action object from the nested object/arrays
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractActions = (obj: any): any[] => {
  const actionsSet = new Set<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function recursiveExtract(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          recursiveExtract(item);
        }
        // eslint-disable-next-line no-prototype-builtins
      } else if (typeof obj === 'object' && obj.hasOwnProperty('action') && typeof obj.action === 'object') {
        actionsSet.add(JSON.stringify(obj.action));
      } else {
        for (const key in obj) {
          recursiveExtract(obj[key]);
        }
      }
    }
  }

  recursiveExtract(obj);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqueActions: any[] = [];
  actionsSet.forEach((actionString) => {
    uniqueActions.push(JSON.parse(actionString));
  });

  return uniqueActions;
};
