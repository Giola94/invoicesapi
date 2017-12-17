/**
 * Created by g.siradze on 12/13/2017.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InvoiceDetails = new Schema({
    name: {
        type: String,
        required: 'Invoice details name is required'
    },
    description: {
        type: String,
        required: 'Invoice details description is required'
    },
    quantity: {
        type: Number,
        required: 'Invoice details quantity is required'
    },
    price: {
        type: Number,
        required: 'Invoice details price is required'
    },
    total: {
        type: Number,
        required: 'Invoice details total is required'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    invoiceId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Invoices',
    }
});

export default mongoose.model('InvoiceDetail', InvoiceDetails);