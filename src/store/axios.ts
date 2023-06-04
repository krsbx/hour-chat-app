import axios from 'axios';
import _ from 'lodash';
import { Config } from 'react-native-config';
import type { AppDispatch, store } from '.';
import {
  overwriteResource,
  setResource,
  updateResource,
} from './actions/resources';

const instance = axios.create({
  baseURL: Config.API_URL,
});

export const applyInterceptors = (
  dispatch: AppDispatch,
  getState: typeof store.getState
) => {
  instance.interceptors.request.use(
    async (config) => {
      const token = getState().auth.token;

      if (config.headers) {
        if (!config.headers.Authorization)
          config.headers.Authorization = token ? `Bearer ${token}` : '';

        if (_.isString(config.headers.resourceName))
          config.resourceName = <HourChat.Type.ResourceName>(
            config.headers.resourceName
          );

        if (_.isBoolean(config.headers.overwrite))
          config.overwrite = config.headers.overwrite;
      }

      return config;
    },
    (err: Error) => Promise.reject(err)
  );

  // set the resource in the redux store on response
  instance.interceptors.response.use((res) => {
    const { config, data } = res;

    if (!config.resourceName) return res;

    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatch(
        updateResource(config.resourceName, {
          id: data.id,
          data,
        }) as never
      );
    } else {
      dispatch(setResource(config.resourceName, data));
    }

    return res;
  });
};

export default instance;
