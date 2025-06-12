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
        const orderId = orderResponseJson.orders[0];

        return orderId;
    }
}

module.exports = {ApiUtils};
