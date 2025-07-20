class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = datathis.message = message
        this.sucess = statusCode < 400
    }
}