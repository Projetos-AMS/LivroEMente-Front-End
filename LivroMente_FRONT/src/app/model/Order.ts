import { DecimalPipe } from "@angular/common";

export interface Order{
    id: string;
    userId: string;
    paymentId: string;
    date: string;
    valueTotal: number;
    status: string;
}