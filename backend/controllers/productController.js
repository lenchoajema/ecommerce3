const getProducts = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, sort = 'name', order = 'asc', search, minPrice, maxPrice } = req.query;
      const query = {};
  
      if (search) query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
      if (minPrice) query.price = { ...query.price, $gte: parseFloat(minPrice) };
      if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };
  
      const products = await Product.find(query)
        .sort({ [sort]: order === 'asc' ? 1 : -1 }) // Dynamic sorting
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const totalProducts = await Product.countDocuments(query);
  
      res.status(200).json({
        products,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
        next(new Error('Failed to fetch products:' + error.message));
      //res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  };
  
  module.exports = { getProducts };
  