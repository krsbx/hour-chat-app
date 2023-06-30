import _ from 'lodash';
import axios from '../axios';

export const uploadFiles =
  (file: HourChat.Type.File | HourChat.Type.File[]) => async () => {
    const files = _.isArray(file) ? file : [file];
    const form = new FormData();

    files.forEach((value) => {
      form.append('file', value);
    });

    const { data } = await axios.post<HourChat.Response.Resource<string[]>>(
      '/files/upload',
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  };
