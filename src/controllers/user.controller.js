import { asyncHandler } from "../utils/assyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js "
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
// Steps To register user -->
// step1 - get User details from frontend  at initially if we have no frontend then we can get data from postman
// step2 - validation   -- like non empty data and all
// step3 -  check if user already exists :  by username, email
// step4 - check files are present or not like images or avtar
// step5 - upload them to cloudinary, avatar
//  step6 = create user object - create entry in db
// step7 = remove password and refresh token field from response
// step8 = check for user creation
// step9 - return  res
const registerUser = asyncHandler(async(req, res) =>{
    
    const {fullName, email, username, password} = req.body
    // console.log("email", email);
    // console.log("username", username)

    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are  required")
    }
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Somthing went wrong while registering the user !")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully !")
    )
})

export {registerUser}