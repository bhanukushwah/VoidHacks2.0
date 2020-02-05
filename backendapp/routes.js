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
                res.json({
                    msg: 'Get Data Successfully',
                    result: result
                });
            }
        });
    });

    //Update Hero Component
    expobj.put('/api/hero/:heroId', upload.single('logo'), function (req, res, next) {
        Hero.updateOne({
            heroId: req.body.heroId
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
    expobj.delete('/api/hero/:heroId', function (req, res) {
        // console.log(req.params.heroId);
        Hero.deleteOne({ "_id": req.params.heroId }).then(function (err, results) {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
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

    //Api to update data
    expobj.put("/api/about/:aboutId", (req, res, next) => {
        About.updateOne({
            aboutId: req.params.aboutId
        }, {
            $set: {
                about_content: req.body.about_content,
                video_link: req.body.video_link
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

    //Api to Delete Data
    expobj.delete('/api/about/:aboutId', function (req, res) {
        About.deleteOne({ "_id": req.params.aboutId }, {
            multi: true
        }, function (err, results) {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }

        });
    });

    // Admin Component



    // Contact Component


    // Register Component


    // Sponsors Component

    const Sponsors = require("./models/sponsors");


    expobj.post("/api/sponsors", upload.single('image'), (req, res, next) => {
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
                    result: result
                });
            }

        });
    });
    expobj.delete('/api/sponsors/:id', function (req, res) {

        Sponsors.remove({ _id: req.params.id }, function (err, result) {
            if (err)
                res.send(err);
            else
                res.json(result);
        });
    });

    // Gallery Component

    const Gallery = require("./models/gallery");
    // API to upload Data
    expobj.post("/api/gallery", upload.single('image'), (req, res) => {
        const gallery = new Gallery({
            image: req.file.path
        })
        Gallery.save(function (err, result) {
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

    expobj.get("/api/gallery", (req, res, next) => {
        Gallery.find(function (err, result) {
            if (err) {
                res.json({
                    msg: 'Error In Gallery'
                });
            } else {
                res.json({
                    msg: 'Gallery run Successfully',
                    result: result
                });
            }

        });
    });
    expobj.delete('/api/gallery/:id', function (req, res) {

        Gallery.remove({ _id: req.params.id }, function (err, result) {
            if (err)
                res.send(err);
            else
                res.json(result);
        });
    });

    //Api to update data
    expobj.put("/api/gallery/:imageId", upload.single('image'), (req, res, next) => {
        Gallery.updateOne({
            imageId: req.fiel.path
        }, {
            $set: {
                image: req.file.path
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

    //Api to Delete Data
    expobj.delete('/api/gallery/:imageId', function (req, res) {
        Gallery.deleteOne({ "_id": req.params.imageId }, {
            multi: true
        }, function (err, results) {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    });

    // FAQ component

    const FAQ = require("./models/faq");



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
                    result: result
                });
            }

        });
    });
    expobj.put('/api/faq/:id', function (req, res) {

        console.log("Updated data" + req.body._id + req.body.question);
        About.update({ _id: req.body._id }, { $set: { question: req.body.question, answer: req.body.answer } }, { multi: true }, function (err, update) {
            if (err)
                res.json(err);
            else
                res.json(update);
        });
    });

    expobj.delete('/api/faq/:id', function (req, res) {

        FAQ.remove({ _id: req.params.id }, function (err, result) {
            if (err)
                res.send(err);
            else
                res.json(result);
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
};
