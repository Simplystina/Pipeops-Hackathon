import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOrder extends Document {
  userId: string;
customerPhone: string | null;
customerName: string| null
  totalAmount: number;
  itemOrdered: { item: string; total: number }[] | null;
  thumbnail: string | null;
  paidDelivery: boolean;
  customerLocation: string | null;
  address: string | null;
  customerAddress: string | null;
  hasPaid: boolean | null;
  paymentCode: string | null;
  paymentUrl: string | null;
  isCodeActive: boolean | null;
}

const orderSchema: Schema<IOrder> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    default: null,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  itemOrdered: [
    {
      item: { type: String, required: true },
      total: { type: Number, required: true },
    },
  ],
  thumbnail: {
    type: String,
    default: null,
  },
  paidDelivery: {
    type: Boolean,
    required: true,
  },
  customerLocation: {
    type: String,
    default: null,
    },
  customerName: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  customerAddress: {
    type: String,
    default: null,
  },
  hasPaid: {
    type: Boolean,
    default: null,
  },
  paymentCode: {
    type: String,
    default: null,
  },
  paymentUrl: {
    type: String,
    default: null,
  },
  isCodeActive: {
    type: Boolean,
    default: null,
  },
}, { timestamps: true });

const OrderModel = mongoose.model<IOrder>('Order', orderSchema);
export default OrderModel;
