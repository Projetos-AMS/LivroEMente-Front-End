import { DecimalPipe } from "@angular/common";

export interface Order{
    id: string;
    userId: string;
    paymentId: string;
    date: Date;
    valueTotal: DecimalPipe;
    status: string;
}