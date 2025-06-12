class ApiUtils {

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: this.loginPayLoad
        });
        
        const loginResponseJson = await loginResponse.json();
        const token = await loginResponseJson.token;

        return token;
    }

    async getProductsCount(token) {

        const productsCountResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products", 
        {
            headers: {
                'Authorization': token, 
                'Accept': 'application/json'
            }
        });

        const productsCountResponseJson = await productsCountResponse.json();
        const productsCount = await productsCountResponseJson.count;

        return productsCount;
    }

    async getOrderId(orderPayLoad, token) {

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
            data: orderPayLoad, 
            headers: {
                'Authorization': token, 
                'Accept': 'application/json'
            }
        });
        
        const orderResponseJson = await orderResponse.json();
        const orderId = await orderResponseJson.orders[0];

        return orderId;
    }

    async deleteOrder(orderId, token) {

        const deleteResponse = await this.apiContext.delete(`https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderId}`, 
        {
            headers: {
                'Authorization': token, 
                'Accept': 'application/json'
            }
        });

        const deleteResponseJson = await deleteResponse.json();
        const deleteMessage = await deleteResponseJson.message;

        return deleteMessage;
    }
}

module.exports = {ApiUtils};
