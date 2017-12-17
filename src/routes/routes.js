/**
 * Created by g.siradze on 12/13/2017.
 */
import { register, login } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import {
    getUserinvoices, create, edit, remove, getInvoicesList, createInvoiceDetails,
    getInvoiceDetails, getInvoiceDetailById, editInvoiceDetailById, removeInvoiceDetailById
} from '../controllers/invoicesController';

const routes = (app) => {
    app.post('/user/signup', register);
    app.post('/user/login', login);

    app.get('/user/:id/invoices', authMiddleware, getUserinvoices);
    app.post('/invoices/create', authMiddleware, create);
    app.put('/invoices/edit', authMiddleware, edit);
    app.delete('/invoices/delete', authMiddleware, remove);
    app.get('/invoices/list', authMiddleware, getInvoicesList);
    app.get('/invoices/:id/details', authMiddleware, getInvoiceDetails);
    app.get('/invoices/:id/details/:detailId', authMiddleware, getInvoiceDetailById);
    app.put('/invoices/:id/details/:detailId/edit', authMiddleware, editInvoiceDetailById);
    app.post('/invoices/:id/details/create', authMiddleware, createInvoiceDetails);
    app.delete('/invoices/:id/details/:detailId/delete', authMiddleware, removeInvoiceDetailById);
};

export default routes;