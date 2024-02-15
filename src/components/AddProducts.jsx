import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {collection, addDoc, setDoc,doc} from 'firebase/firestore';
import {db , storage} from '../config/Config.jsx';
import '../css/Home.css';
import { useUserAuth } from "../context/UserAuthContext";
import {  useNavigate } from "react-router-dom";
import SellerNav from './SellerNav.jsx';

function AddProducts() {
  const { user } = useUserAuth();
  let navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('');
    } else {
      setProductImg(null);
      setError('Please select a valid image type (png or jpeg)');
    }
  }

  const addProduct = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `product-images/${productImg.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, productImg);
      alert('Image Uploaded Successfully');
      const url = await getDownloadURL(snapshot.ref);
      await setDoc(doc(db, "Sellers", `${user.email}`), {
        email: user.email,
      });
      const docRef = await addDoc(collection(db, 'Sellers', `${user.email}` , 'Products'), {
        productName: productName,
        productSeller: user.email,
        productPrice: Number(productPrice),
        productImg: url,
        productStock: Number(productStock),
        productRating: Number(productRating)
      });
      console.log("Document written with ID: ", docRef.id);
      setProductImg(null);
      setProductName('');
      setProductPrice(0);
      setProductStock(0);
      setProductRating(0);
      setError('');
      alert('Product Added Successfully');
      navigate('/seller');
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className='container' style={{ marginLeft: '-15px' }}>
      <SellerNav />
      <div style={{ marginLeft: '50%' }}>
      <br />
      <h1>Add Products</h1>
      <hr/>
      <form autoComplete='off' className='form-group' onSubmit={addProduct}>
          <label htmlFor='product-name'>Product Name</label>
          <br />
          <input type='text' className='form-control' required 
          onChange={(e) => setProductName(e.target.value)} value={productName} />
          <br />
          <label htmlFor='product-price'>Product Price</label>
          <br />
          <input type='number' className='form-control' required 
          onChange={(e) => setProductPrice(e.target.value)} value={productPrice}/>
          <br />
          <label htmlFor='product-stock'>Product Stock Available</label>
          <br />
          <input type='number' className='form-control' required 
          onChange={(e) => setProductStock(e.target.value)} value={productStock}/>
          <br />
          <label htmlFor='product-rating'>Product Rating</label>
          <br />
          <input type='number' className='form-control' required 
          onChange={(e) => setProductRating(e.target.value)} value={productRating}/>
          <br />
          <label htmlFor='product-img'>Product Image</label>
          <br />
          <input type='file' className='form-control' onChange={handleImg}/>
          <br />
          <button className='btn btn-success btn-md mybtn'>ADD</button>
      </form>
      {error && <span>{error}</span>}
    </div>
    </div>
  )
}

export default AddProducts;
