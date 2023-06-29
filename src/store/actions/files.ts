import _ from 'lodash';
import { DocumentPickerResponse } from 'react-native-document-picker';
import axios from '../axios';

type File = Pick<DocumentPickerResponse, 'uri' | 'name' | 'type'>;

export const uploadFiles = (file: File | File[]) => async () => {
  const files = _.isArray(file) ? file : [file];
  const form = new FormData();

  files.forEach((value) => {
    form.append('file', value);
  });

  const { data } = await axios.post<HourChat.Response.Resource<string>>(
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
