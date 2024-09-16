export type Endpoints = Record<string, string>;

export namespace EndpointsUrls {
    const apiUrl = 'https://localhost:7151/api';
    export const apiEndpoints: Endpoints = {
        uploadImage: `${apiUrl}/Upload`,
        allBooks: `${apiUrl}/Book`,
        addBook: `${apiUrl}/Book`,
        allCategories: `${apiUrl}/CategoryBook`,
    };
}
