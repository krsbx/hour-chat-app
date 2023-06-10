import _ from 'lodash';
import moment from 'moment';
import { RESOURCE_EXPIRE_AFTER, RESOURCE_NAME } from '../constants/common';

export const hasOwnProperty = <
  Z extends NonNullable<unknown>,
  X extends NonNullable<unknown> = NonNullable<unknown>,
  Y extends PropertyKey = PropertyKey
>(
  obj: X,
  property: Y
): obj is X & Record<Y, Z> => obj.hasOwnProperty(property);

export const castTo = <T>(params: unknown) => params as T;

export const createFullName = (
  user: HourChat.Resource.User | undefined | null
) =>
  _([user?.firstName, user?.middleName, user?.lastName])
    .map(_.trim)
    .compact()
    .join(' ');

export const toArray = <T extends unknown[] | unknown>(resource: T) =>
  _.isArray(resource) ? resource : [resource];

export const addExpirationTime = <T extends unknown[] | unknown>(
  resource: T
) => {
  const expiredAt = moment()
    .add(RESOURCE_EXPIRE_AFTER.AMOUNT, RESOURCE_EXPIRE_AFTER.UNIT)
    .toDate();
  const resources = toArray(resource);

  return _.map(resources, (resource) => {
    Object.assign(resource, {
      expiredAt,
    });

    return resource;
  });
};

export const isExpireable = (resourceName: HourChat.Type.ResourceName) =>
  _.includes(_.values(RESOURCE_NAME), resourceName);

export const isResourceExpired = <T extends ValueOf<HourChat.Store.Resource>>(
  resource: T
) => {
  if (!hasOwnProperty<string>(resource, 'expiredAt')) return false;

  return moment(resource.expiredAt).isBefore(new Date());
};
