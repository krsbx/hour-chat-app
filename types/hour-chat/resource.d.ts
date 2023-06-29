import { GENDER } from '../../src/constants/resources';

export type User = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  gender: ValueOf<typeof GENDER>;
  dob: string | Date;
  createdAt: string;
  updatedAt: string;
  expiredAt: string;
};

export type DeviceToken = {
  id: string;
  userId: string;
  token: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserLocation = {
  id: string;
  userId: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};
