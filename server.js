const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');



// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : "*"}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use('/uploads', express.static('uploads'));

// DB connection
const dbconnect = require('./config/db.js');

// routers
const userRouter = require('./routes/user/web/user.routes.js');
const adminRouter = require('./routes/admin/web/admin.routes.js');
const productRouter = require('./routes/product/product.routes.js');
const wishListRouter = require('./routes/wishList/wishList.routes.js');
const cartRouter = require('./routes/cart/cart.routes.js');
const colorsRouter = require('./routes/colors/colors.routes.js');
const reviewRouter = require('./routes/product/review.routes.js');
const orderRouter = require("./routes/order/order.routes.js");
const companyLogoRouter = require('./routes/companyLogo/companyLogo.routes.js');
const menCollectionRouter = require('./routes/homepage/category/menCollection.routes.js');
const womenCollectionRouter = require('./routes/homepage/category/womenCollection.routes.js');
const kidsCollectionRouter = require('./routes/homepage/category/kidsCollection.routes.js');
const heroSectionRouter = require('./routes/homepage/heroSection/heroSection.routes.js');
const offerSectionRouter = require('./routes/homepage/offerSection/offerSection.routes.js');
const startingAmountSectionRouter = require('./routes/homepage/startingAmountSection/startingAmountSection.routes.js')






// routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/product", reviewRouter);
app.use("/wishList", wishListRouter);
app.use("/cart", cartRouter);
app.use("/cart", orderRouter);
app.use("/colors", colorsRouter);
app.use("/companyLogo", companyLogoRouter);
app.use("/home", menCollectionRouter);
app.use("/home", womenCollectionRouter);
app.use("/home", kidsCollectionRouter);
app.use("/home", heroSectionRouter);
app.use("/home", offerSectionRouter);
app.use("/home", startingAmountSectionRouter);









// Start the server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
    dbconnect();
});

// Default route
app.get('/', (req, res) => {
    res.send("Default Route");
});