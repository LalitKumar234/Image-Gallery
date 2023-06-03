const File = require('../Model/file.model');
require("dotenv").config();

const fileUpload = async (req, res) => {
    const { name, description } = req.body
    try {
        const response = await fetch(`https://www.filestackapi.com/api/store/S3?key=${process.env.FS_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'image/png' },
            body: req.files.image.data
        });
        const responseData = await response.json();
        console.log(responseData);

        const file = new File({
            imageUrl: responseData.url,
            name,
            description
        });

        const savedImage = await file.save();
        console.log('Image saved:', savedImage);
        res.json({ message: 'Congrats! Your upload successfully done' });

    } catch {
        // console.error('Error:', error);
        res.status(500).json({ error: 'Sorry! Something went wrong' });
    }
}

const getAllImage = async (req, res) => {
    try {
        const allImage = await File.find();
        res.json(allImage)
    }
    catch (err) {
        res.send({ message: err })
    }
}
module.exports = { fileUpload, getAllImage }