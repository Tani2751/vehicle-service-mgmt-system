


const Success_Response = (res, statusCode, message, data = {}) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    })
};

export default Success_Response;