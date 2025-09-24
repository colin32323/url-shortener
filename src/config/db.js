import mongoose from "mongoose";

function generateMongoURL() {
    const {
        MONGO_PORT,
        MONGO_USER_NAME,
        MONGO_PASSWORD,
        MONGO_HOST,
        MONGO_DB_NAME,
    } = process.env;

    // Encode password safely for URL
    const encodedPassword = encodeURIComponent(MONGO_PASSWORD);

    return `mongodb://${MONGO_USER_NAME}:${encodedPassword}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;
}

export async function connectDB() {
    try {
        const mongoURL = generateMongoURL();
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}
