/**
 * Created by g.siradze on 12/13/2017.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    date: {
        type: Date,
        required: 'Invoice date is required'
    },
    modified: {
        type: Date
    },
    description: {
        type: String,
        required: 'Invoice description is required'
    },
    contactName: {
        type: String,
        required: 'Contact name is required'
    },
    address: {
        type: String,
        required: 'Address is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'User for invoice is required'
    }
});

export default mongoose.model('Invoices', InvoiceSchema);