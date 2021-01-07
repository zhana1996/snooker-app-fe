import { createAction, props } from '@ngrx/store';

export const createUser = createAction('[Register Page] Create new user', props<{ user: Object} >());
export const createUserSuccess = createAction('[Regidter Page] Create new user Success', props<{ user: Object }>());
export const createUserError = createAction('[Register Page] Create new user Error', (error: Error) => error);

export const logInUser = createAction('[LogIn Page] LogIn', props<{ user: Object} >());
export const logInUserSuccess = createAction('[LogIn Page] LogIn Success', props<{ logIn: Object }>());
export const logInUserError = createAction('[LogIn Page] LogIn Error', (error: Error) => error);