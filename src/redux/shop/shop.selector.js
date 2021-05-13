import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollection = memoize((collectionUrlParam) => (
    // Curried Function, function that returns another function
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
        )
    )
)