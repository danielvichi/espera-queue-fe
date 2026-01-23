import type { ChangeEvent } from 'react';

export interface HandleInputChangeArgs<T> {
  event: ChangeEvent<HTMLInputElement>;
  field: keyof T;
}
