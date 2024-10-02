import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/Product.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required!" });
      case !price:
        return res.json({ error: "Price is required!" });
      case !description:
        return res.json({ error: "Description is required!" });
      case !category:
        return res.json({ error: "Category is required!" });
      case !quantity:
        return res.json({ error: "Quantity is required!" });
      case !brand:
        return res.json({ error: "Brand is required!" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required!" });
      case !price:
        return res.json({ error: "Price is required!" });
      case !description:
        return res.json({ error: "Description is required!" });
      case !category:
        return res.json({ error: "Category is required!" });
      case !quantity:
        return res.json({ error: "Quantity is required!" });
      case !brand:
        return res.json({ error: "Brand is required!" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).error({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found!" });
  }
});

const fetchAllproducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed!");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ message: "Review added successfully!" });
    } else {
      res.status(404);
      throw new Error("product not found!");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const {checked, radio} = req.body
    const args = {}
    
    if (checked.length) args.category = checked
    if (radio.length) args.price = {$gte: radio[0], $lte: radio[1]}

    const products = await Product.find(args)
    res.json(products)
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Server error'})
  }
})

export {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProduct,
  fetchAllproducts,
  fetchTopProducts,
  fetchNewProducts,
  addProductReview,
  filterProducts,
};
