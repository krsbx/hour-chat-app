import { AppDispatch } from '..';
import { ConfigActionType, ConfigReducer } from '../actions-types/config';

export const setConfig =
  (payload: Partial<ConfigReducer>) => (dispatch: AppDispatch) => {
    dispatch({
      type: ConfigActionType.SET,
      payload,
    });
  };

export const deleteConfig = () => (dispatch: AppDispatch) => {
  dispatch({
    type: ConfigActionType.DELETE,
  });
};
