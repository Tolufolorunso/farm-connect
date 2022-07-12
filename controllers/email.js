const Email = require("../models/email.js");


exports.addEmail = (req, res, next) => {
    Email.findOne({
        email: req.body.email
    }).then((email) => {
        if (email) {
            return res.status(423).send({
                status: false,
                message: "This email already exists",
                data: {
                    error: "This email already exists",
                },
            });
        } else {
            const newEmail = Email.create(req.body);
            newEmail.then((email) => {
                res.status(201).json({
                    status: "success",
                    message: "Email added successfully",
                    data: {
                        email
                    },
                });
            });
        }
    })

}