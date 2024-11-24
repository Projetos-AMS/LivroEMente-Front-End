import { DecimalPipe } from "@angular/common";


export interface OrderDto{
    userId: string,
    user: userDto,
    date: string,
    status:string,
    valueTotal: number,
    orderDetails:OrderDetailsDto[];

}
export interface OrderRequest{
    orderRequest:{
    userId: string,
    
    date: string,
    status:string,
    valueTotal: number,
    orderDetails:OrderDetailsRequest[];
    }
}


export interface userDto{
    completeName: string
}
export interface OrderDetailsDto{
    bookId: string,
    amount: number,
    valueUni: number,
    book:BookDto
}
export interface OrderDetailsRequest{
    bookId: string,
    amount: number,
    valueUni: number,
}

export interface BookDto{
    title: string,
    author: string,
    value: number,
    publishingCompany: string
    category:CategoryDto
}

export interface CategoryDto{
   description:string
}