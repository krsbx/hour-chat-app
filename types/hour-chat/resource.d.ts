export type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
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
