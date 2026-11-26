import urlJoin from "url-join";
const hostname = process.env.API_HOSTNAME;
export const getApiPath = (
  path = null,
  withHostname = true,
  replaceParams = {},
) => {
  if (!path) {
    throw new Error("no path");
  }
  const apiPrefixes = [];
  if (withHostname) {
    apiPrefixes.push(hostname);
  }
  apiPrefixes.push(path);
  let _path = urlJoin(...apiPrefixes);
  Object.keys(replaceParams).forEach((_key) => {
    _path = _path.replaceAll(`:${_key}`, replaceParams[_key]);
  });
  return _path;
};
