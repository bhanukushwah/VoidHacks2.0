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
                    msg: 'Get Data Successfully',
                    result : result
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

    const About= require("./models/about");

    expobj.post("/api/about", (req, res) => {
        const about = new About({
            about_content: req.body.about_content,
            video_link: req.body.video_link
        })
        about.save(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Failed to upload.',
                    err: err
                });
            } else {
                res.json({
                    msg: 'Uploaded Successfully.'
                });
            }

        });
    });

    // Admin Component


    // Contact Component


    // Register Component


    // Sponsors Component

    const Sponsors= require("./models/sponsors");

    
    expobj.post("/api/sponsors" , upload.single('image'), (req, res, next) => {
        const sponsors = new Sponsors({
            image: req.file.path
        });
        sponsors.save(function (err, result) {
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

    expobj.get("/api/sponsors", (req, res, next) => {
        Sponsors.find(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Error In Sponsors'
                });
            } else {
                console.log(result)
                res.json({
                    msg: 'Sponsors execute successfully',
                    result : result
                });
            }

        });
    });
    expobj.delete('/api/sponsors/:id', function(req, res){

        Sponsors.remove({_id: req.params.id}, function(err, result){
            if(err)
                res.send(err);
            else
            res.json(result);
        });
    });

    // Gallery Component

    const Gallery= require("./models/gallery");

    
    expobj.post("/api/gallery", upload.single('image'), (req, res, next) => {
        const gallery = new Gallery({
            image: req.file.path
        });
        gallery.save(function (err, result) {
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

    expobj.get("/api/gallery", (req, res, next) => {
        Gallery.find(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Error In Gallery'
                });
            } else {
                console.log(result)
                res.json({
                    msg: 'Gallery run Successfully',
                    result : result
                });
            }

        });
    });
    expobj.delete('/api/gallery/:id', function(req, res){

        Gallery.remove({_id: req.params.id}, function(err, result){
            if(err)
                res.send(err);
            else
            res.json(result);
        });
    });

    // FAQ component

    const FAQ= require("./models/faq");


    expobj.post("/api/faq", (req, res) => {
        const about = new FAQ({
            question: req.body.question,
            answer: req.body.answer
        })
        about.save(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Failed to upload.',
                    err: err
                });
            } else {
                res.json({
                    msg: 'Uploaded Successfully.'
                });
            }

        });
    });

    expobj.get("/api/faq", (req, res, next) => {
        FAQ.find(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Error In FAQ'
                });
            } else {
                console.log(result)
                res.json({
                    msg: 'FAQ run Successfully',
                    result : result
                });
            }

        });
    });
    expobj.put('/api/faq/:id', function(req, res){

        console.log("Updated data" +req.body._id + req.body.question);
        About.update({_id: req.body._id},{$set:{question:req.body.question,answer:req.body.answer}},{multi:true}, function(err, update){
                if(err)
                res.json(err);
                else
                res.json(update);
            });
    });

    expobj.delete('/api/faq/:id', function(req, res){

        FAQ.remove({_id: req.params.id}, function(err, result){
            if(err)
                res.send(err);
            else
            res.json(result);
        });
    });


};