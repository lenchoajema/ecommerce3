module.exports.validateProduct = (req, res, next) => {
    const { name, price, stock } = req.body;
  
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Product name is required and must be a string.' });
    }
  
    if (!price || typeof price !== 'number') {
      return res.status(400).json({ message: 'Product price is required and must be a number.' });
    }
  
    if (!stock || typeof stock !== 'number') {
      return res.status(400).json({ message: 'Product stock is required and must be a number.' });
    }
  
    next();
  };
  