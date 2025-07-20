const asyncHandler = (requestHendler) => {
  (req, res, next) => {
    Promise.resolve(requestHendler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => {}
// const asyncHandler = () => {async() => {}}

// It's an a Wrapper Function which can be used anyWhere
// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
