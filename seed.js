const mongoose = require('mongoose');
const Product = require('./models/product');


const products = [
    {
        name: "Nike Air Max2",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        price: 5000,
        desc:"With its open window, double stacked Air Cushioning and minimal upper, the Nike Air Max 2X brings a breath of fresh air to the streets. The padded collar and tongue add to comfort while a mixture of matte and gloss finishes creates an expressive, DIY look that's built to last."
    },
    {
        name: "Chuck 70",
        img: "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        price: 4000,
        desc:"Classic black and white sneakers come together as one in this edition of the Chuck 70. A paneled, colorblocked design brings a clean look that's easy to pair with anything and everything in your closet. The Chuck 70 mixes the best details from the ’70s-era Chuck with impeccable craftsmanship and premium materials. An elevated style icon, it features more cushioning to keep you looking—and feeling—good all day."
    },
    {
        name: "Panerai Luminor",
        img: "https://images.unsplash.com/photo-1468421201266-ec88b2809284?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
        price: 15000,
        desc:"The PANERAI watches are a natural blend of Italian design, Swiss technology and passion for the sea.\r\nPower reserve 8 days with linear indicator, three barrels, seconds reset device. Column wheel. 321 components."
    },
    {
        name: "Seiko Sarb",
        img: "https://images.unsplash.com/photo-1612817159576-986a0b7a4165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80",
        price: 5500,
        desc:"Automatic Movement with 50-hour power reserve\r\nSapphire Crystal\r\nJapanese-automatic Movement\r\nCase Diameter: 38.4mm\r\nWater resistant to 100m (330ft): in general, suitable for swimming and snorkeling, but not diving."
    },
    {
        name: "Rayban",
        img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        price: 3500,
        desc:"Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937. Aviator Classic sunglasses are a timeless model that combines great aviator styling with exceptional quality, performance and comfort."
    },
    {
        name: "Sony XB900N",
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        price: 2500,
        desc:"With exceptional bass and advanced noise cancellation, WH-XB900N headphones put the focus firmly on the music. Let your party for one begin. Discover these wireless, noise cancelling headphones with a host of smart functions like intuitive touch controls, Quick Attention for easy conversation, and a long battery life, all in a smart design that's made for all-day listening with deep, punchy sound."
    },
    {
        name: "Apple AirPods",
        img: "https://images.unsplash.com/photo-1600294037761-f9ef414e1036?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        price: 10000,
        desc:"With more talk time, voice-activated Siri access — and a wireless charging case — AirPods deliver an unparalleled wireless headphone experience. Simply take them out and they’re ready to use with all your devices. Put them in your ears and they connect immediately, immersing you in rich, high-quality sound. Just like magic."
    },
    {
        name: "Samsung 4K Smart TV",
        img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        price: 50000,
        desc:"4K UHD TV goes beyond regular FHD with 4x more pixels, offering your eyes the sharp and crisp images they deserve. Now you can see even the small details in the scene. Surround yourself with sound from TV and soundbar orchestrated in harmony. Q Symphony uniquely allows TV and soundbar speakers to operate simultaneously for better surround effect without muting TV speakers."
    }

]

const seedDB = async ()=>{
    
    await Product.insertMany(products);
    console.log("DB Seeded");
}

module.exports = seedDB;
