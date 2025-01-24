const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export {asyncHandler}



// YOU CAN DO IT BY TRY-CATCH ALSO 
/*

const asyncHandler = () => {}
        |  you can pass function as parameter also
        v
const asyncHandler = (func) => () => {}
        |  and that function could be async also
        v
const asyncHandler = (func) => async () => {}

*/


// LIKE THIS vvvvvvvvvvvvvv

// const asyncHandler = (fn) => async(req, res, next) => {
//     try{

//     }catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }