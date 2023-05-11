/*EXAMPLE 
const url = '/api/users/123';
const prefix = 'api/users'; */
export const createRegexForLastPart = (prefix: string) => {
  const regexPattern = `/${prefix}/([^/]+)$`;
  return new RegExp(regexPattern);
};
