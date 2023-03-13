//TODO work-in progess, not currently used
export type RootState = StateType<
  typeof import('../../../../../../apps/mms/src/store/root-reducer').default
>;

declare module 'typesafe-actions' {
  interface Types {
    RootState: RootState;
  }
}
/*
import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootState = StateType<
    typeof import('../../../../../../apps/mms/src/store/root-reducer').default
  >;
}
*/