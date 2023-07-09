import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";
import SimpleSlider from "@/components/Carousel";
import axios from 'axios';
export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />

      <SimpleSlider />
      {/* <Hero /> */}
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
      <Footer />
    </div >
  );
}

export async function getServerSideProps() {


  await mongooseConnect();
  const featuredProductCount = await Product.countDocuments();
  const randomIndex = Math.floor(Math.random() * featuredProductCount);
  const featuredProduct = await Product.findOne().skip(randomIndex);
  console.log(featuredProduct)
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
// export async function getServerSideProps() {
//   try {
//     const response = await axios.get('/api/fetchData'); // Make the GET request to /api/fetchData
//     const { featuredProduct, newProducts } = response.data; // Extract the data from the response

//     return {
//       props: {
//         featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
//         newProducts: JSON.parse(JSON.stringify(newProducts)),
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         error: 'Failed to fetch data',
//       },
//     };
//   }
// }