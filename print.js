const Jimp = require('Jimp')
/*Jimp.loadFont('font.fnt').then(function (font) {
    baseImage.print(font, 10, 10, "Hello World!");
    baseImage.write("output.png");
});*/


Jimp.read("/Users/julian/IdeaProjects/lvb_raspi/img.png")
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont("/Users/julian/Downloads/PressStart2P-vaV7.ttf-5/16aPkv_cojdMp4jRi15f5RX3.ttf.fnt");
    })
    .then(function (font) {
        loadedImage.print(font, 0, 8, "30+2")




            .write("/Users/julian/IdeaProjects/lvb_raspi/img2.png");
    })
    .catch(function (err) {
        console.error(err);
    });


