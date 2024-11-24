export type Endpoints = Record<string, string>;

export namespace EndpointsUrls {
    const apiUrl = 'http://localhost:5035/api';
    export const apiEndpoints: Endpoints = {
        uploadImage: `${apiUrl}/Upload`,
        allBooks: `${apiUrl}/Book`,
        addBook: `${apiUrl}/Book`,
        byBook: `${apiUrl}/Book/`,
        updateBook: `${apiUrl}/Book/`,
        cancelBook: `${apiUrl}/Book/`,
        allCategories: `${apiUrl}/CategoryBook`,
        byIdCategory:  `${apiUrl}/CategoryBook/`,
        register: `${apiUrl}/users/Register`,
        addOrder: `${apiUrl}/Order`,
        login: `${apiUrl}/users/Login`,
        totalOrders: `${apiUrl}/Admin/allOrders?$select=total&$top=1`,
        allOrders:`${apiUrl}/Order`,
        byIdOrder: `${apiUrl}/Order/`,
        preference: `${apiUrl}/Preference`,
        cancelOrder: `${apiUrl}/Order/`,
        userOrder: `${apiUrl}/Order/`
    };
}
