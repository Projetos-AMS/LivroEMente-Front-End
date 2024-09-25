export type Endpoints = Record<string, string>;

export namespace EndpointsUrls {
    const apiUrl = 'http://localhost:5035/api';
    export const apiEndpoints: Endpoints = {
        uploadImage: `${apiUrl}/Upload`,
        allBooks: `${apiUrl}/Book`,
        addBook: `${apiUrl}/Book`,
        allCategories: `${apiUrl}/CategoryBook`,
        register: `${apiUrl}/users/Register`,
        login: `${apiUrl}/users/Login`,
        totalOrders: `${apiUrl}/Admin/allOrders?$select=total&$top=1`,
        allOrders:`${apiUrl}/Order`,
        byIdOrder: `${apiUrl}/Order/`,
        preference: `${apiUrl}/Preference`,
        cancelOrder: `${apiUrl}/Order/`
    };
}
