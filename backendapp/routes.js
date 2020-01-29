const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter

});

module.exports = function (expobj) {

    // API for Application  

    // Home


    // Hero Component

    const Hero = require("./models/hero");

    //Upload Hero Content
    expobj.post("/api/hero", upload.single('logo'), (req, res, next) => {
        const hero = new Hero({
            logo: req.file.path,
            date: req.body.date,
            venue: req.body.venue
        });
        hero.save(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Failed to upload.'
                });
            } else {
                res.json({
                    msg: 'Uploaded Successfully.'
                });
            }

        });
    });

    
    //Get Hero Content
    expobj.get("/api/hero", (req, res, next) => {
        Hero.find(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Error Not Get Data Successfully'
                });
            } else {
                console.log(result)
                res.json({
                    msg: 'Get Data Successfully'
                });
            }

        });
    });
    
    
    //Update Hero Content
    // expobj.use(upload.array());
    // expobj.patch("/api/hero/:productId", (req, res, next) => {
    //     const id = req.params.productId;
    //     const updateOps = {};
    //     for (const ops of req.body) {
    //         updateOps[ops.propName] = ops.value;
    //     }
    //     Hero.update({
    //             _id: id
    //         }, {
    //             $set: updateOps
    //         })
    //         .exec()
    //         .then(result => {
    //             res.status(200).json({
    //                 message: 'Product updated',
    //                 request: {
    //                     type: 'GET',
    //                     url: 'http://localhost:3000/products/' + id
    //                 }
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({
    //                 error: err
    //             });
    //         });
    // });

    // Hero.delete("/:productId", (req, res, next) => {
    //     const id = req.params.productId;
    //     Product.remove({
    //             _id: id
    //         })
    //         .exec()
    //         .then(result => {
    //             res.status(200).json({
    //                 message: 'Product deleted',
    //                 request: {
    //                     type: 'POST',
    //                     url: 'http://localhost:3000/products',
    //                     body: {
    //                         name: 'String',
    //                         price: 'Number'
    //                     }
    //                 }
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({
    //                 error: err
    //             });
    //         });
    // });




    // About Component


    // Admin Component


    // Contact Component


    // Register Component


    // Sponsors Component


    // Gallery Component



};