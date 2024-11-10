import { DecimalPipe } from "@angular/common";


export interface OrderDto{
    id: string,
    userId: string,
    date: Date,
    status:string,
    user: userDto,
    valueTotal: number,
    orderDetails:OrderDetailsDto[];
}

export interface userDto{
    completeName: string
}
export interface OrderDetailsDto{
    bookId: string,
    amount: number,
    valueUni: number,
    book: BookDto
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