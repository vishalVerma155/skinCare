const User = require('../../../models/userModel/user.model.js');
const { hashPassword, comparePassword } = require('../../../utils/bcrypt.js');
const { generateJWT } = require('../../../utils/jwt.js')

// user register controllers
const registerUser = async (req, res) => {

    try {
        const { name,email, userName, password, google_id } = req.body;

        if (!email || !userName) {
            return res.status(401).json({ success: false, error: "User name and email are compulsary" });
        }


        // check if user is already existed
        const isUserExisted = await User.findOne({ $or: [{ userName }, { email: userName }] });

        if (isUserExisted) {
            return res.status(401).json({ success: false, error: "User is already existed. Please login or choose other user name" });
        }


        let hashedPassword = undefined;

        if (password) {
            hashedPassword = await hashPassword(password);
        }

        // create user
        const newUser = new User({
            name,
            email,
            userName: userName ? userName : undefined,
            password: hashedPassword,
            google_id: google_id ? google_id : undefined
        })

        // save user
        await newUser.save();

        // const cart = new Cart({
        //     userId: newUser._id,
        //     products: []
        // })

        // await cart.save();

        // const  wishList = new WishList({
        //     userId : newUser._id,
        //     products: [],
        // })   

        // await wishList.save();
        // console.log("Cart and wishlist has been sucessfully made.");

        const payload = {
            _id: newUser._id,
            email: newUser.email,
            userName : newUser.userName
        };

        // generate access token
        const accessToken = generateJWT(payload);

        res.cookie("AccessToken", accessToken);

        // return response
        res.status(200).json({ success: true, Message: "User has been  successfully register.", user: newUser, token: accessToken });

    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }

};

// login user
const loginUser = async (req, res) => {

    try {
        const { userName, password } = req.body;

        if(!userName || userName && userName.trim() === "" || !password || password && password.trim() === ""){
            return res.status(401).json({ success: false, error: "All fields are compulsary" });
        }


        // check if user is existed
        const user = await User.findOne({ $or: [{ userName }, { email: userName }] });

        if (!user) {
            return res.status(401).json({ success: false, error: "User is not existed." });
        }

        // compare password
        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, error: "Invalid password" });
        }


        const payload = {
            _id: user._id,
            email: user.email,
            userName: user.userName
        };

        // generate jwt token
        const accessToken = generateJWT(payload);

        res.cookie("AccessToken", accessToken);

        // return response
       return res.status(200).json({ success: true, Message: "User has been  sucessfully Loged in.", user, token: accessToken });

    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }

};

// get user profile details
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // take affiliate id from request
        const user = await User.findById(userId, { password: 0 });
        return res.status(200).json({ success: true, user }); // return response
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {

        if (!req.user || req.user.userName !== "admin") {
            return res.status(401).json({ success: false, error: "Only admin can get all users list" });
        }
        const all_Users = await User.find();
        return res.status(200).json({ success: true, all_Users }); // return response
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

// // delete user profile

const deleteUserProfile = async (req, res) => {
    try {
        const userId = req.user?._id; // get user id
        const { password } = req.body;
        const user = await User.findById(userId); // find user
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(402).json({ success: false, error: "Wrong password" });
        }

        await User.findByIdAndDelete(user._id); // find and delete user

        res.clearCookie("AccessToken"); // clear cookies for logout
        return res.status(200).json({ success: true, Message: "User has been sucessfully deleted" }); // return response
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}


const deleteUserByAdmin = async (req, res) => {
    try {
        if(!req.user || req.user.userName !== "admin"){
            return res.status(402).json({ success: false, error: "Only admin can delete user" });
        }
        const userId = req.params.userId; // get user id
        
        if(!userId){
            return res.status(402).json({ success: false, error: "User id not found" });
        }

      const deletedUser =  await User.findByIdAndDelete(userId); // find and delete user

      
      if(!deletedUser){
        return res.status(402).json({ success: false, error: "User  not found" });
    }
        return res.status(200).json({ success: true, Message: "User has been sucessfully deleted", deletedUser }); // return response
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

const editUserProfile = async (req, res) => {
    try {

        const userId = req.user._id;

        if (!userId) {
            return res.status(402).json({ success: false, error: "User is not loged in" });
        }

        const { name, email, userName } = req.body;

        const payload = {};

        if (name) {
            payload.name = name;
        }

        if (email) {
            payload.email = email;
        }

        if (userName) {
            payload.userName = userName;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true });

        if (!updatedUser) {
            return res.status(402).json({ success: false, error: "User not found" });
        }

        return res.status(200).json({ success: true, Message: "User has been sucessfully updated.", updatedUser }); // return response

    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });

    }
}

// change User password

const changeUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body; // take details

        if (!currentPassword || currentPassword && currentPassword.trim() === "" || !newPassword || newPassword && newPassword.trim() === "") {
            return res.status(401).json({ success: false, error: "Please enter all fields" });
        }

        const user = await User.findById(req.user._id);


        // compare password
        const isPasswordCorrect = await comparePassword(currentPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, error: "password is not matched" });
        }

        const newHashedPassword = await hashPassword(newPassword);
        user.password = newHashedPassword;
        await user.save();

        return res.status(200).json({ success: true, Message: "Password has been chenged" });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// logout affiliate
const logoutUser = (req, res) => {
    try {
        res.clearCookie("AccessToken"); // clear cookies for logout
        return res.status(200).json({
            success: true,
            Message: "User logedout sucessfully"
        })
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}


module.exports = { registerUser, loginUser, getUserProfile, getAllUsers, changeUserPassword, deleteUserProfile, logoutUser, editUserProfile, deleteUserByAdmin };