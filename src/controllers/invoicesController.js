/**
 * Created by g.siradze on 12/13/2017.
 */

import Invoice from '../models/invoice';
import InvoiceDetail from '../models/invoicedetails';
import User from '../models/user';
import mongoose from 'mongoose';

export const getUserinvoices = (req, res) => {
    const records = 10;
    const query = {};

    if (!req.query.page) {
        return res.status(403).send('page parameter is required');
    }

    if (req.query.searchText) {
        query['name'] = req.query.searchText;
    }

    if (mongoose.Types.ObjectId.isValid(req.params.id) && req.params.id == req.userid) {
        query['userId'] = req.params.id;

        Invoice.find(query)
            .skip((req.query.page - 1) * records)
            .limit(records)
            .then(invoices => res.json({
                success: true,
                data: invoices
            }))
            .catch(err => res.send(err));
    } else {
        return res.status(404).send('user not found');
    }

};

export const create = (req, res) => {
    let invoice = new Invoice(req.body);

    User.findOne({_id: req.userid})
        .then((user) => {
            if (!user) {
                return res.status(404).send('user not found');
            }
            invoice.userId = req.userid;
            invoice.save()
                .then(() => res.json({
                    success: true,
                    message: 'invoice added successfully'
                }))
                .catch((err) => res.send(err));
        })
        .catch(err => res.send(err));
};

export const edit = (req, res) => {
    req.body.modified = new Date();
    Invoice.findOneAndUpdate({_id: req.body.id}, req.body, {new: true})
        .then((invoice) => {
            if (!invoice) {
                return res.status(404).send('invoice not found');
            }
            res.json({
                success: true,
                message: 'invoice updated successfully'
            });
        })
        .catch(err => res.send(err));
};

export const remove = (req, res) => {
    Invoice.findOneAndRemove({_id: req.body.id})
        .then(deleted => {
            if (!deleted) {
                return res.status(404).send('invoice not found');
            }
            res.json({
                success: true,
                message: 'invoice deleted successfully'
            })
        })
        .catch(err => res.send(err));
};

export const getInvoicesList = (req, res) => {
    const records = 10;
    const query = {};

    if (!req.query.page) {
        return res.status(403).send('page parameter is required');
    }

    if (req.query.searchText) {
        query['name'] = req.query.searchText;
    }

    Invoice.find(query)
        .skip((req.query.page - 1) * records)
        .limit(records)
        .then(invoices => res.json({
            success: true,
            data: invoices
        }))
        .catch(err => res.send(err));
};

export const createInvoiceDetails = (req, res) => {
    let invoiceDetail = new InvoiceDetail(req.body);

    Invoice.findOne({_id: req.params.id, userId: req.userid})
        .then((invoice) => {
            if (!invoice) {
                return res.status(404).send('invoice not found');
            }

            invoiceDetail.userId = invoice.userId;


            invoiceDetail.save()
                .then(() => res.json({
                    success: true,
                    message: 'invoice details added successfully'
                }))
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
};

export const getInvoiceDetails = (req, res) => {
    let invoiceId = req.params.id;

    InvoiceDetail.find({
        invoiceId: invoiceId,
        userId: req.userid
    })
        .then((invoicedetail) => {
            if (!invoicedetail) {
                return res.status(404).send('invoice details not found');
            }
            res.json(invoicedetail);
        })
        .catch(err => res.send(err));
};

export const getInvoiceDetailById = (req, res) => {
    let invoiceId = req.params.id;
    let invoiceDetailsId = req.params.detailId;

    InvoiceDetail.find({
        _id: invoiceDetailsId,
        invoiceId: invoiceId,
        userId: req.userid
    })
        .then((invoiceDetail) => {
            if (!invoiceDetail) {
                return res.status(404).send('invoice details not found');
            }
            res.json(invoiceDetail);


        })
        .catch(err => res.send(err));
};

export const editInvoiceDetailById = (req, res) => {
    let invoiceId = req.params.id;
    let invoiceDetailsId = req.params.detailId;

    InvoiceDetail.findOneAndUpdate({
        _id: invoiceDetailsId,
        invoiceId: invoiceId,
        userId: req.userid
    }, req.body, {new: true})
        .then((invoiceDetail) => {
            if (!invoiceDetail) {
                return res.status(404).send('invoice details not found');
            }
            res.json({
                success: true,
                message: 'invoice details updated successfully'
            });
        })
        .catch(err => res.send(err));

};

export const removeInvoiceDetailById = (req, res) => {
    let invoiceId = req.params.id;
    let invoiceDetailsId = req.params.detailId;

    InvoiceDetail.findOneAndRemove({
        _id: invoiceDetailsId,
        invoiceId: invoiceId,
        userId: req.userid
    })
        .then(deleted => {
            if (!deleted) {
                return res.status(404).send('invoice details not found');
            }
            res.json({
                success: true,
                message: 'invoice details deleted successfully'
            })
        })
        .catch(err => res.send(err));
};
