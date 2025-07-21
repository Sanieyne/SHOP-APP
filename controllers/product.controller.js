const Product = require('../models/product.model');
const ProductImage = require('../models/productImage.model');
const ProductDetail = require('../models/productDetail.model');
const Size = require('../models/size.model');
const Color = require('../models/color.model');

function shuffleArray(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'hasDiscount', 'discountPercentage'],
      include: {
        model: ProductImage,
        as: 'images',
        attributes: ['url']
      },
      order: [['id', 'ASC']],
    });

    const result = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      hasDiscount: product.hasDiscount,
      discountPercentage: product.hasDiscount ? product.discountPercentage : null,
      image: product.images.length > 0 ? shuffleArray(product.images)[0].url : null
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: ProductImage,
          as: 'images',
          attributes: ['id', 'url']
        },
        {
          model: ProductDetail,
          as: 'details',
          include: [
            {
              model: Size,
              attributes: ['id', 'value']
            },
            {
              model: Color,
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const details = product.details.map((detail) => ({
      size: detail.Size?.value,
      color: detail.Color?.name,
      stock: detail.stock
    }));

    res.json({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      hasDiscount: product.hasDiscount,
      discountPercentage: product.hasDiscount ? product.discountPercentage : null,
      images: product.images,
      details
    });
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, hasDiscount, discountPercentage, images } = req.body;

    const newProduct = await Product.create({
      name,
      price,
      description,
      hasDiscount: hasDiscount ?? false,
      discountPercentage: hasDiscount ? discountPercentage : null,
    });

    if (Array.isArray(images) && images.length > 0) {
      const imageEntries = images.map((url) => ({
        url,
        productId: newProduct.id,
      }));
      await ProductImage.bulkCreate(imageEntries);
    }

    const createdWithImages = await Product.findByPk(newProduct.id, {
      include: { model: ProductImage, as: 'images', attributes: ['url'] },
    });

    res.status(201).json(createdWithImages);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
