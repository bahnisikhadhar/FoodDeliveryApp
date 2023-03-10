import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../utils/hooks/useFetch';
import { MENU_LIST_URL } from '../utils/constants';
import { IMG_BASE_URL } from '../utils/constants';
import discountLogo from '../assets/discount.png';
import Shimmer from './Shimmer';
import foodPlaceholder from '../assets/restaurant.png';

import "./MenuDetailsBanner.css"
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

function MenuDetails() {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(MENU_LIST_URL + id);
  const restoData = data?.data;
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItems, setAddedItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = Object.values(restoData?.menu?.items || {}).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const dispatch = useDispatch();
  const addFoodItem = (item) => {

    dispatch(addItem(item));
    setAddedItems([...addedItems, item.id]);
    console.log(addedItems)
    setShowSuccess(true);
  }
  const isAddedToCart = (itemId) => {
    return addedItems.includes(itemId);
  };
  useEffect(() => {
    let timerId;
    if (showSuccess) {
      timerId = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [showSuccess]);

  return (
    <div className="menu-details-container">
      {error && <p>{error}</p>}
      {isPending && <Shimmer />}
      {data && (
        <>
          <div className="menu-details-banner">
            <img className="menu-details-banner-image" src={IMG_BASE_URL + restoData?.cloudinaryImageId} alt={restoData.name} />

            <div className="menu-details-banner-info">
              <h1 className="menu-details-banner-title">{restoData.name}</h1>
              <h2 className="menu-details-banner-cuisines">{restoData?.cuisines?.join(', ')}</h2>
              <h2 className="menu-details-banner-location">{restoData?.city}, {restoData?.area}</h2>

              <div className="menu-details-banner-down">
                <div className="menu-details-banner-down-content">
                  <p><i class="fa-solid fa-star" style={{ color: "white", fontSize: ".8rem", marginRight: ".3rem" }}></i>{restoData?.avgRating}</p>
                </div>
                <div style={{ color: "gray" }}>|</div>
                <div className="menu-details-banner-down-content">
                  <p>{restoData?.costForTwoMsg}</p>
                </div>
              </div>
            </div>

            <div className="menu-details-banner-offers">
              {restoData?.offerMeta.slice(0, 2).map((offer) => (
                <div key={offer.id} className="menu-details-banner-offer">
                  <img className="menu-details-banner-offer-image" src={discountLogo} alt="Offer" />
                  <div className="menu-details-banner-offer-info">
                    <h1 className="menu-details-banner-offer-header heading1">{offer.header}</h1>
                    <h2 className="menu-details-banner-offer-code heading1">COUPON CODE: {offer.coupon_code}</h2>
                    <h2 className="menu-details-banner-offer-description heading1">APPLIES FOR: {offer.description}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="menu-details-search">
            <input
              type="text"
              placeholder="Search for your favourite dishes"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className='menu-details-item-container'>
            {filteredItems.map((item) => {
              const itemImg = item.cloudinaryImageId ? IMG_BASE_URL + item.cloudinaryImageId : foodPlaceholder;

              return (
                <div key={item.id} className="menu-details-item">
                  <h2 className="menu-details-item-name heading1">{item.name}</h2>
                  <img className="menu-details-item-image" src={itemImg} alt="menu-item" />
                  <h2 className="menu-details-item-price heading1">RS: {(item.price) / 100}/-</h2>
                  {isAddedToCart(item.id) ? <button className="menu-details-item-added-btn" disabled>Added To Cart</button> : <button className="menu-details-item-add-btn" onClick={() => addFoodItem(item)}>Add</button>}
                </div>
              );
            })}
            {showSuccess && <div className="popup">
              Item added successfully!
            </div>}

          </div>
          {/* </div> */}

        </>
      )}
    </div>
  );
}


export default MenuDetails;