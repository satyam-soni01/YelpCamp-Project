const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6066fca7dccc4805cc1cf6a3",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolores, non quo facilis inventore quisquam enim hic adipisci illo, culpa rerum deserunt, maxime itaque suscipit temporibus nam tempora? Hic, libero!",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/mindflayer/image/upload/v1617728758/Yelpcamp/j9hsvdy1tzdhtmynadb2.jpg",
                    filename: "Yelpcamp/j9hsvdy1tzdhtmynadb2"
                },
                {
                  url: 'https://res.cloudinary.com/mindflayer/image/upload/v1617471497/Yelpcamp/ksdwepl8pbjhlihpkryh.jpg',
                  filename: 'Yelpcamp/ksdwepl8pbjhlihpkryh'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})