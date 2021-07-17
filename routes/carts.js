const express = require('express');

const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// receive a post request to add an item to cart
router.post('/cart/products', async (req, res) => {
  let cart;
  // figure out the cart
  if (!req.session.cartId) {
    // If we don't have one, one needs to be created,
    cart = await cartsRepo.create({ items: [] });
    // and store the cart id on the req.session.cartId property
    req.session.cartId = cart.id;
  } else {
    //   We have a cart! get it from repo
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  // either increment qty for existing product
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.send('product added to cart');
});
// OR add new product to items array
// receive a GET request to show all items in cart
router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

// receive a post request to delete an item from a cart

module.exports = router;
