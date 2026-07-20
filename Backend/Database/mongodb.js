import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://fullstackProject:prince12@ac-l2tcdbx-shard-00-00.w4kuesq.mongodb.net:27017,ac-l2tcdbx-shard-00-01.w4kuesq.mongodb.net:27017,ac-l2tcdbx-shard-00-02.w4kuesq.mongodb.net:27017/?ssl=true&replicaSet=atlas-6wvy15-shard-0&authSource=admin&appName=Prince");
        console.log("Database connected successfully....");
    } catch (error) {
        console.log("Error:", error);
        process.exit(1);
    }
}

export default connectDb;