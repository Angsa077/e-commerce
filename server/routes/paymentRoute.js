import express from "express";
import midtransClient from "midtrans-client";

const router = express.Router();

router.post("/process-transaction", (req, res) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: `${process.env.MIDTRANS_SERVER_KEY}`,
            clientKey: `${process.env.MIDTRANS_CLIENT_KEY}`,
        });

        const parameter = {
            transaction_details: {
                order_id: req.body.order_id,
                gross_amount: req.body.total
            },
            customer_details: {
                first_name: req.body.name
            }
        }

        snap.createTransaction(parameter).then((transcation) => {
            const dataPayment = {
                response: JSON.stringify(transcation)
            }
            const token = transcation.token;
            res.status(200).json({ message: "berhasil", token: token, dataPayment });
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;