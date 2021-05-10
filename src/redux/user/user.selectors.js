import { createSelector } from 'reselect';

const selectUser = state => state.user;

/**
 * First arg can be an array of our input selectors
 * Second arg can be a function that receives the return of 
 * the input selector
 */
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)