export type Resource<T extends NonNullable<unknown> = NonNullable<unknown>> = {
  code: number;
  status: string;
  data: T;
};

export type Resources<T extends NonNullable<unknown> = NonNullable<unknown>> =
  Omit<Resource<T>, 'data'> & {
    data: T[];
    page: HourChat.Store.ResourcePage;
  };

export type Error<T extends NonNullable<unknown> = NonNullable<unknown>> = Omit<
  Resource<T>,
  'data'
> & {
  name?: string;
  errors?: unknown;
  message?: unknown;
};
