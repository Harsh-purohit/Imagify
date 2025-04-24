import pg from "pg";

const client = new pg.Client({
    connectionString: process.env.POSTGRE_URL,
});

try {
    await client.connect();
    console.log("Database connected");
    // You can keep the client available for queries or export it
} catch (err) {
    console.error("Database connection error:", err);
}


export default client;