const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        const DB_OPTIONS = {
            dbName: 'Inz',
        }
        await mongoose.connect("mongodb+srv://szymondeczkowski1:pqOTOqmMjL0iRjRr@reactcluster.pz9kwmk.mongodb.net/", DB_OPTIONS);
        console.log("Baza: Połączono");
    } catch (error){
        console.log("Baza: Błąd");
        console.log(error)
    }
}

module.exports = connectDB;