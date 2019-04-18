import { createBrowserHistory } from 'history';
import _ from 'lodash';
import qs from 'qs';

const history = createBrowserHistory();

function getRoutePath() {
  return history.location.pathname;
}

function getRoutePathEnd() {
  const path = getRoutePath();
  const pathParts = _.split(path, '/');

  return _.last(pathParts);
}

function getRouteQueryParams(paramName: string) {
  const params = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  return paramName ? params[paramName] : params;
}

function routeIncludes(subPath: string) {
  const path = getRoutePath();
  return _.includes(path, subPath);
}

export default history;

export {
  history,
  getRoutePath,
  getRoutePathEnd,
  getRouteQueryParams,
  routeIncludes
};
