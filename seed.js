const mongoose = require('mongoose');
const Product = require('./models/product');

const products =[
    {
        name: "Iphone 12",
        img: "https://images.unsplash.com/photo-1605637158613-e81498245703?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGlwaG9uZSUyMDEyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 10000,
        desc:" iPhone 12 now in purple. Pre-order now. Six colours. Ceramic Shield. Super Retina XDR display. A14 Bionic chip. Services: No-contact free delivery, EMI available, Shop with Specialists."
    },
    {
        name: "Mackbook Air",
        img: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFjYm9vayUyMGFpcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 150000,
        desc:" iPhone 12 now in purple. Pre-order now. Six colours. Ceramic Shield. Super Retina XDR display. A14 Bionic chip. Services: No-contact free delivery, EMI available, Shop with Specialists."
    },
    {
        name: "Titan Watch",
        img: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdhdGNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 10000,
        desc:"Titan is the largest and most trusted watch brand in India with innovative & modern design. Explore A Wide Range of Inspired, Contemporary & Elegant Collection of Watches. Shop Now! Limited period offer. No Cost EMI available. Brands: Titan, Sonata, Fastrack, Xylys."
    },
    {
        name: "HP Laptop",
        img: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 70000,
        desc:"5%* Cashback Offer On Laptops Above Rs. 30,000. w/ 11th Gen Intel Core i5. Shop Now! Compare Products. Track An Order. View Offers. Highlights: Store Locator Available, Order Tracking Option Available, Customer Service Available."
    },
    {
        name: "Rolex",
        img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cm9sZXglMjB3YXRjaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 10000,
        desc:"Rolex watches are crafted from the finest raw materials and assembled with scrupulous attention to detail. Discover the Rolex collection on the Official Rolex ..."
    },
    {
        name: "Boat Headphone",
        img: "https://images.unsplash.com/photo-1547932087-59a8f2be576e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGhlYWRwaG9uZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 7000,
        desc:"iRockerz – Enjoy the Vibe With the Best Wireless Headphones. Effortless. Simple. Powerful. With boAt Rockerz Wireless series, get high-fidelity audio paired with"
    },
    {
        name: "Drone",
        img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZHJvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 60000,
        desc:" Drones can be used for various purposes, such as filming a wildlife video, capturing aerial shots of crops, or capturing stunning photos"
    }   
]

const seedDB = async ()=>{

    await Product.insertMany(products);
    console.log("DB seeded");
}

module.exports = seedDB;