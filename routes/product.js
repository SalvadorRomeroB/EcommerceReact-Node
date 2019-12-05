const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

// filters/queries
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.put("/updateproduct", (req, res) => {
  console.log(req.body.params._id);
  Product.findByIdAndUpdate(req.body.params._id, req.body.body)
    .select("-photo")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products nos found"
        });
      }
      res.send(data);
    });
});

// IDs
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
