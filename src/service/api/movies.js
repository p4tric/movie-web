// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch movie list
 * @param {*} payload
 */
export async function fetchMovieList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`${params}`);
}
