import React from 'react';
import '../css/Home.css';
import { FaShoppingCart, FaStar, FaFireAlt } from 'react-icons/fa';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: this.getRandomBrightColor()
    };
  }

  getRandomBrightColor() {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Check brightness (YIQ formula)
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    // Ensure the color is bright enough (adjust threshold as needed)
    if (brightness < 128) {
      return this.getRandomBrightColor();
    }

    // Return the color in hex format
    return `rgb(${r},${g},${b})`;
  }

  render() {
    return (
      <div className='productList'>
        <div
          key={this.props.id}
          className='productCard'
          style={{ backgroundColor: this.state.backgroundColor }}
        >
          <img src={this.props.image} alt='product-img' className='productImage'></img>

          <FaShoppingCart className={"productCard__cart"} />
          {this.props.stock < 5 && <FaFireAlt className={"productCard__fastSelling"} />}
          <div className='productCard__content'>
            <h3 className='productName'>{this.props.name}</h3>
            <div className='displayStack__1'>
              <div className='productPrice'>₹{this.props.price}</div>
              <div className='productRating'>
                {[...Array(this.props.rating)].map((_, index) => (
                  <FaStar id={index + 1} key={index} />
                ))}
              </div>
            </div>
            <div className='displayStack__2'>
              <div className='productSeller'>Seller : <br />{this.props.seller}</div>
              <div className='productStock'>Stock: <br />{this.props.stock}</div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Card;
