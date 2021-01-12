const sendError = async function (message, errCode, next) {
    let err = new Error(message);
    err.status = errCode;
    next(err);
};

const sendResponse = async function (message, code, result, res) {
    const response = {
        message: message,
        success: true,
        code: code,
        result: result,
    }

    res.status(code).json(response);
}

module.exports = { sendResponse, sendError }; // Exports all models
