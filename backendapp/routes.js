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
                    result: result
                });
            }
        });
    });

    //Update Hero Component
    expobj.put('/api/hero/:id', upload.single('logo'), function (req, res, next) {
        Hero.update({
            _id: req.body._id
        }, {
            $set: {
                logo: req.file.path,
                date: req.body.date,
                venue: req.body.venue
            }
        }, {
            multi: true
        }, function (err, update) {
            if (err) {
                res.json(err);
            } else {
                res.json(update);
            }
        });
    });

    //Delete Hero Component
    expobj.delete('/api/hero/:id', function (req, res, next) {
        Hero.deleteOne(req.params._Id).then(function (err, results) {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            };
        })
    });


    // About Component

    const About = require("./models/about");

    // API to upload Data
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

    // Api to get data
    expobj.get("/api/about", (req, res) => {
        About.find(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Failed to get Data'
                });
            } else {
                res.json({
                    msg: 'Successfully Get Data',
                    result: result
                })
            }
        });
    });

    // //Api to update data
    // expobj.put("/api/about/:id", (req, res) => {
    //     About.update({
    //         _id: req.params._id
    //     }, {
    //         $set: {
    //             about_content: req.body.about_content,
    //             video_link: req.body.video_link
    //         }
    //     }, {
    //         multi: true
    //     }, function (err, update) {
    //         if (err) {
    //             res.json(err);
    //         } else {
    //             res.json({
    //                 msg: 'data updated',
    //                 update: update
    //             });
    //         }
    //     });
    // });

    // //Api to Delete Data
    // expobj.delete('/api/about/:id', function (req, res, next) {
    //     About.deleteOne(req.params._Id).then(function (err, results) {
    //         if (err) {
    //             res.json(err);
    //         } else {
    //             res.json(results);
    //         };
    //     })
    // });

    // Admin Component


    // Contact Component


    // Register Component


    // Sponsors Component


    // Gallery Component

    const Gallery= require("./models/gallery");

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

    // FAQ component

    const FAQ= require("./models/faq");
    
    // get api for FAQ
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
    
    // Post api for FAQ
    expobj.post("/api/faq", (req, res) => {
        const faq = new FAQ({
            question: req.body.question,
            answer: req.body.answer
        })
        FAQ.save(function (err, result) {
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
     //Delete api for FAQ
     expobj.delete('/api/faq/:id', function (req, res, next) {
        FAQ.deleteOne(req.params._Id).then(function (err, results) {
          if (err) {
            res.json(err);
          } else {
           res.json(results);
       };
   })
});  
    //Update api for FAQ
    expobj.put("/api/faq/:id", (req, res, next) => {
        FAQ.updateOne({
            _id: req.params._id
        }, {
            $set: {
                question: req.body.question,
                answer: req.body.answer
            }
        }, {
            multi: true
        }, function (err, update) {
            if (err) {
                res.json(err);
            } else {
                res.json(update);
            }
        });
    });     
    
    };

