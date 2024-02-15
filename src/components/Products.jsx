import React , {useState , useEffect}  from 'react'
import '../css/Home.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/Config.jsx';
import Card from './Card.jsx';

function Products() {
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading state as true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerSnapshot = await getDocs(collection(db, 'Sellers'));
        const productsPromises = sellerSnapshot.docs.map(async (sell) => {
          const querySnapshot = await getDocs(collection(db, 'Sellers', sell.id, 'Products'));
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
        const productsArray = await Promise.all(productsPromises);
        const products = productsArray.flat(); // Flatten the array of arrays
  
        setProd(products);
        setLoading(false); // Set loading state to false after data fetching
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading state to false in case of error
      }
    };
  
    fetchData();
  }, []); // Empty dependency array to run once on component mount
  
  console.log(prod);
  return (
    <>
    <div className='App'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        prod.map((product) => (
          <Card 
            key={product.id}
            image={product.productImg}
            name={product.productName}
            price={product.productPrice}
            stock={product.productStock}
            rating={product.productRating}
            seller={product.productSeller}
          />
        ))
      )}
    </div>
    </>
  );
}

export default Products;
