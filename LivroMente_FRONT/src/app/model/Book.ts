export interface Book {
  id: string;
  title: string ;
  author: string;
  synopsis: string ;
  quantity: number;
  pages: number;
  publishingCompany: string;
  isbn: string;
  value: number;
  language: string;
  classification: number;
  isActive: boolean;
  categoryId: string;
  urlBook: string;
  urlImg: string;
}