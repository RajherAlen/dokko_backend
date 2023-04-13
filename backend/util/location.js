const HttpError = require("../models/http-error");
const { default: axios } = require("axios");

const API_KEY = "ab0cb8f224a44463906eb60b3444df01";

const getCoordsForAddress = async (city) => {
    const { data } = await axios.get(
        // `https://api.geoapify.com/v1/geocode/search?street=${encodeURIComponent(street)}&city=${encodeURIComponent(city)}&format=json&apiKey=${API_KEY}`
        `https://api.geoapify.com/v1/geocode/search?city=${encodeURIComponent(city)}&limit=1&type=city&format=json&apiKey=${API_KEY}`
        ); 

    if (!data) {
        // invalid user input 
        throw new HttpError("Could not find location for the specific address.", 422);
    } else {
        const {lon, lat} = data.results[0];
        const coordinated = {lon, lat};
        
        return coordinated;
    }
};

module.exports = getCoordsForAddress;