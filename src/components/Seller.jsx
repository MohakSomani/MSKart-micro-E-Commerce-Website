import React , {useState , useEffect}  from 'react'
import '../css/Home.css'
import { collection, getDocs } from "firebase/firestore";
import SellerNav from './SellerNav.jsx'
import { db } from '../config/Config.jsx';
import Card from './Card.jsx';
import { useUserAuth } from "../context/UserAuthContext";

function Seller() {
  const { user } = useUserAuth();
    
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Sellers', `${user.email}` , 'Products'));
        console.log(querySnapshot);
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
        });
        setProd(products);
        setLoading(false); // Set loading state to false after data fetching
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  return (
    <>
    <SellerNav />
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


export default Seller

// function Products() {
//   const [prod, setProd] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "Products"));
//         const products = [];
//         querySnapshot.forEach((doc) => {
//           products.push({ id: doc.id, ...doc.data() });
//           console.log(doc.id, " => ", doc.data());
//         });
//         setProd(products);
//         setLoading(false); // Set loading state to false after data fetching
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run once on component mount

//   return (
//     <div className='App'>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         prod.map((product) => (
//           <Card 
//             key={product.id}
//             image={product.productImg}
//             name={product.productName}
//             price={product.productPrice}
//             stock={product.productStock}
//             rating={product.productRating}
//             seller={product.productSeller}
//           />
//         ))
//       )}
//     </div>
//   );
// }

// export default Products;
