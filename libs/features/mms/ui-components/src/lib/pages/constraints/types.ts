import { ChangeEvent } from 'react';

import { EventConstraint } from '@lths/features/mms/data-access';

import { Constraint, DateRangeData } from '../types';

export type ChangeState = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;

export type ChangeEventState = (
  type: 'states' | 'events',
  values:
    | string[]
    | {
        checked: boolean;
        value: string;
      }
) => void;

export type ChangeDateRange = (key: keyof DateRangeData, value: Date | null) => void;

export type TransformEventConstraintPayload = (
  data: EventConstraint[],
  selectedType: Constraint,
  selectedData: Record<string, number | boolean | string | string[] | Date | Record<string, string>>
) => EventConstraint[];
