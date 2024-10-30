const mongoose = require("mongoose");
const Address = require("../models/addresses"); // Update with your actual path
const Place = require("../models/places"); // Update with your actual path

const seedPlaces = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Address.deleteMany({});
    await Place.deleteMany({});
    console.log("Cleared existing data");

    // Create sample addresses
    const addresses = await Address.insertMany([
      {
        region: "Amhara",
        zone: "North Gondar",
        woreda: "Gondar",
        city: "Gondar",
        altitude: "2200m",
        latitude: "12.6",
        longitude: "37.46",
        distance_from_city_center: "5km"
      },
      {
        region: "Oromia",
        zone: "East Shewa",
        woreda: "Bishoftu",
        city: "Bishoftu",
        altitude: "1920m",
        latitude: "8.75",
        longitude: "39.01",
        distance_from_city_center: "10km"
      },
      {
        region: "SNNPR",
        zone: "Gamo Gofa",
        woreda: "Arba Minch",
        city: "Arba Minch",
        altitude: "1285m",
        latitude: "6.03",
        longitude: "37.55",
        distance_from_city_center: "2km"
      },
      {
        region: "Tigray",
        zone: "Mekelle",
        woreda: "Mekelle",
        city: "Mekelle",
        altitude: "2250m",
        latitude: "13.5",
        longitude: "39.47",
        distance_from_city_center: "3km"
      },
      {
        region: "Afar",
        zone: "Afar Region",
        woreda: "Semera",
        city: "Semera",
        altitude: "120m",
        latitude: "11.8",
        longitude: "40.97",
        distance_from_city_center: "4km"
      },
      {
        region: "Addis Ababa",
        zone: "Addis Ababa",
        woreda: "Addis Ababa",
        city: "Addis Ababa",
        altitude: "2400m",
        latitude: "9.03",
        longitude: "38.74",
        distance_from_city_center: "0km"
      },
      {
        region: "Amhara",
        zone: "Lalibela",
        woreda: "Lalibela",
        city: "Lalibela",
        altitude: "2630m",
        latitude: "12.03",
        longitude: "39.04",
        distance_from_city_center: "1km"
      },
      {
        region: "Harari",
        zone: "Harar",
        woreda: "Harar",
        city: "Harar",
        altitude: "1885m",
        latitude: "9.31",
        longitude: "42.13",
        distance_from_city_center: "3km"
      },
      {
        region: "SNNPR",
        zone: "South Omo",
        woreda: "Jinka",
        city: "Jinka",
        altitude: "1490m",
        latitude: "5.65",
        longitude: "36.65",
        distance_from_city_center: "2km"
      },
      {
        region: "Amhara",
        zone: "Bahirdar",
        woreda: "Bahirdar",
        city: "Bahirdar",
        altitude: "1800m",
        latitude: "11.6",
        longitude: "37.38",
        distance_from_city_center: "5km"
      },
      {
        region: "Somali",
        zone: "Jijiga",
        woreda: "Jijiga",
        city: "Jijiga",
        altitude: "1609m",
        latitude: "9.35",
        longitude: "42.8",
        distance_from_city_center: "2km"
      },
      {
        region: "Amhara",
        zone: "Debark",
        woreda: "Debark",
        city: "Debark",
        altitude: "2900m",
        latitude: "13.15",
        longitude: "37.89",
        distance_from_city_center: "1km"
      },
      {
        region: "Benishangul-Gumuz",
        zone: "Assosa",
        woreda: "Assosa",
        city: "Assosa",
        altitude: "1570m",
        latitude: "10.07",
        longitude: "34.53",
        distance_from_city_center: "6km"
      },
      {
        region: "Oromia",
        zone: "Bale",
        woreda: "Robe",
        city: "Robe",
        altitude: "2449m",
        latitude: "7.12",
        longitude: "40.01",
        distance_from_city_center: "3km"
      },
      {
        region: "Gambela",
        zone: "Gambela",
        woreda: "Gambela",
        city: "Gambela",
        altitude: "526m",
        latitude: "8.25",
        longitude: "34.58",
        distance_from_city_center: "2km"
      }
    ]);
    console.log("Addresses created");

    // Create sample places
    await Place.insertMany([
      { name: "Fasil Ghebbi (Fasilides Castle)", address: addresses[0]._id, entry_price: 50, description: "A UNESCO World Heritage Site in Gondar.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Lake Bishoftu", address: addresses[1]._id, entry_price: 20, description: "A beautiful crater lake surrounded by lush greenery.", created_by: "6721d0feab835dd86d8fb76a" },
      { name: "Nech Sar National Park", address: addresses[2]._id, entry_price: 100, description: "A park known for its diverse wildlife and lakes.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Rock-Hewn Churches of Lalibela", address: addresses[6]._id, entry_price: 200, description: "Eleven medieval monolithic cave churches.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Erta Ale Volcano", address: addresses[4]._id, entry_price: 300, description: "A continuously active basaltic shield volcano.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "National Museum of Ethiopia", address: addresses[5]._id, entry_price: 50, description: "Home of the famous fossil Lucy.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Harar Jugol", address: addresses[7]._id, entry_price: 30, description: "Historic walled city with unique architecture.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Omo National Park", address: addresses[8]._id, entry_price: 150, description: "Home to various ethnic groups and wildlife.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Blue Nile Falls", address: addresses[9]._id, entry_price: 60, description: "One of the most spectacular waterfalls in Africa.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Ras Dashen", address: addresses[12]._id, entry_price: 70, description: "Highest mountain in Ethiopia.", created_by: "6721d0feab835dd86d8fb76a" },
      { name: "Simien Mountains National Park", address: addresses[11]._id, entry_price: 100, description: "Stunning mountain scenery and endemic wildlife.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Sof Omar Cave", address: addresses[13]._id, entry_price: 80, description: "One of the most spectacular and extensive underground caves.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Bale Mountains National Park", address: addresses[13]._id, entry_price: 120, description: "Known for unique wildlife and beautiful scenery.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Gambela National Park", address: addresses[14]._id, entry_price: 90, description: "Home to diverse wildlife and scenic landscapes.", created_by:"6721d0feab835dd86d8fb76a" },
      { name: "Tiya Archaeological Site", address: addresses[5]._id, entry_price: 40, description: "UNESCO World Heritage site with stone monuments.", created_by:"6721d0feab835dd86d8fb76a" }
    ]);
    console.log("Places created");

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

module.exports ={seedPlaces}
