import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default async function fetchData(req, res) {
  if (req.method === "GET") {
    const data = await fetchDataFromDb();
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
}

export async function fetchDataFromDb() {
  console.log("fetchDataFromDb");
  try {
    await mongooseConnect();
    const randomIndex = Math.floor(Math.random() * 10) + 1;

    const featuredProduct = await Product.findOne().skip(randomIndex);

    const newProducts = await Product.find({}, null, {
      sort: { _id: -1 },
      limit: 10,
    });

    const products = await Product.find({}, null, { sort: { _id: -1 } });
    const categories = await Category.find({}, null, { sort: { _id: -1 } });
    const productsWithCategories = products.map((product) => {
      const category = categories.find(
        (category) => category._id.toString() === product.category.toString()
      );
      return {
        ...product.toObject(),
        category: category.toObject(),
      };
    });

    const data = {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      products: JSON.parse(JSON.stringify(productsWithCategories)),
      categories: JSON.parse(JSON.stringify(categories)),
    };

    return data;
  } catch (error) {
    console.error(error.message);
  }
}
