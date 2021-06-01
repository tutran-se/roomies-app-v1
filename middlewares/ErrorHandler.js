export const ErrorHandler = (error, req,res,next) => {

    let statusCode = 500;
    let message = "Something went wrong !!!";
    // Error: Id not found
    if(error.name === 'CastError'){
        statusCode = 404;
        message = `The Id: ${error.value} is not found !!!`
    }

    // Error: Unique

    if(error.code === 11000){
        statusCode = 400;
        message= `Room's ${Object.keys(error.keyValue)[0]} must be unique!`
    }

    // Error: ValidationError
    if(error.name === "ValidationError"){
        const key = Object.keys(error.errors)[0];
        statusCode = 400;
        message= error.errors[key].message
    }

    res.status(statusCode).json({
        success: false,
        message,
        error
    })
}