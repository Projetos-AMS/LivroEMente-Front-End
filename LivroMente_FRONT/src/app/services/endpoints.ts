export type Endpoints = Record<string, string>;

export namespace EndpointsUrls {
    const apiUrl = 'http://localhost:5035/api';
    export const apiEndpoints: Endpoints = {
        uploadImage: `${apiUrl}/Upload`,
        allBooks: `${apiUrl}/Book`,
        addBook: `${apiUrl}/Book`,
        allCategories: `${apiUrl}/CategoryBook`,
        totalOrders: `${apiUrl}/Admin/allOrders?$select=total&$top=1`
    };
}
