import { GENDER } from '../../src/constants/resources';

export type User = {
  id: number;
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
};

export type DeviceToken = {
  id: number;
  userId: number;
  token: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserLocation = {
  id: number;
  userId: number;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
};
