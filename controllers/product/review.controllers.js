const Review = require('../../models/productModel/review.model.js');
const User = require('../../models/userModel/user.model.js');

const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;


        if(!req.user){
            return res.status(404).json({ success: false, error: "User is not loged in" });
        }

        const userId = req.user._id;


        if (!productId || !productId || !rating || rating <=0) {
            return res.status(404).json({ success: false, error: "Product id and rating is compulsary" });
        }

        const review = new Review({
            productId,
            userId,
            rating,
            comment
        });

        await review.save();

       return res.status(201).json({ success: true, message : "Review has been saved", review });
    } catch (error) {
       return res.status(500).json({success: false, error: error.message });
    }
}

const getReviewsByProduct = async(req, res) =>{
    try {
        const productId = req.params.productId;
        if(!productId){
            return res.status(404).json({ success: false, error: "Product id not found" });
        }

        const reviews = await Review.find({productId}).populate("userId", "name");

        return res.status(200).json({ success: true, reviews });

    } catch (error) {
       return res.status(500).json({success: false, error: error.message });
    }
}


const getAllReviews = async(req, res) =>{
    try {
        
        if(req.user.userName !== "admin"){
            return res.status(404).json({ success: false, error: "Only admin can delete reviews" });
        }

        const all_Reviews = await Review.find()
        .populate("productId", "productName productCategory")
        .populate("userId", "name")
        ;
        return res.status(200).json({ success: true, all_Reviews });

    } catch (error) {
       return res.status(500).json({success: false, error: error.message });
    }
}

const deleteReview = async(req, res) =>{
    try {
        const reviewId = req.params.reviewId;
        const user = req.user.userName;
        console.log(reviewId)

        if(user !== "admin"){
            return res.status(404).json({ success: false, error: "Only admin can delete reviews" });
        }

        if(!reviewId){
            return res.status(404).json({ success: false, error: "Review id not found" });
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if(!deletedReview){
            return res.status(404).json({ success: false, error: "Review has not been deleted." });
        }

       return res.status(201).json({ success: true, message : "Review has been deleted", deletedReview });

    } catch (error) {
        return res.status(500).json({success: false, error: error.message }); 
    }
}

module.exports = {createReview, getReviewsByProduct, deleteReview, getAllReviews};