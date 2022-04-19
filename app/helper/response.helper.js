module.exports = function getStandardResponse(code, message, records){
    return {
        code: code,
        message : message,
        records : records
     }
}
