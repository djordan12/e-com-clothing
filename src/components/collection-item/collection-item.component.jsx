import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
    <div className='collection-item'>
        <div className='image' style={{backgroundImage: `url(${imageUrl})`}}></div>
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>${price}</span>
        </div>
        <CustomButton inverted onClick={() => addItem(item)}>Add to cart</CustomButton>
    </div>
    )
};

//Flow: onClick addItem(item) -> triggers mapDispatchToProps addItem -> dispatch addItem(item) from cart.actions
//mapDispatchToProps allows my addItem to be accessible in the props!
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);