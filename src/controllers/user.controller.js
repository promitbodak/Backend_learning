import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from the Frontend
    // validation - (eg. Not empty)
    // Check if user already exists: check username/email
    // check for images, check for avaters
    // upload them to cloudinary, avater check explicitly whether uploded of not
    // create user object - create entry in DB
    // remove password and refresh token field from the response
    // Check for user creation
    // return response

    const {fullName, email, username, password} = req.body
    
    // you can handel errors by individual if  conditions
    // OR
    // you can Do this instead ---V
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "all fields are required")
    }
    
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avaterLocalPath = req.files?.avater[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // the above way for coverImageLocalPath was actually errore prone while no cover image is available
    // instead use the below method

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avaterLocalPath){
        throw new ApiError(400, "avater image is required")
    }

    const avater = await uploadOnCloudinary(avaterLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avaterLocalPath){
        throw new ApiError(400, "avater image is required")
    }

   const user = await User.create({
        fullName,
        avater: avater.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"  // this select method by default selects everything and by passing this string with fields preceded by a "-" sign we exclude whats not required
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")        
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

})

export {registerUser}