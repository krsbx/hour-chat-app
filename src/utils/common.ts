export const hasOwnProperty = <
  Z extends NonNullable<unknown>,
  X extends NonNullable<unknown> = NonNullable<unknown>,
  Y extends PropertyKey = PropertyKey
>(
  obj: X,
  property: Y
): obj is X & Record<Y, Z> => obj.hasOwnProperty(property);
