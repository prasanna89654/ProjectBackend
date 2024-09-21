import pkg from "pg";
import fs from "fs/promises"; // to read the setup.sql file

const { Pool } = pkg;

const pool = new Pool({
  user: "cmsdb_owner",
  host: "ep-delicate-band-a1i0x9c3.ap-southeast-1.aws.neon.tech",
  database: "cmsdb",
  password: "O0A9uCDyJbGf",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Function to run the setup.sql script
async function runSQLScript() {
  try {
    // Read the setup.sql file
    const sql = await fs.readFile("./setup.sql", "utf8");

    // Execute the SQL script
    await pool.query(sql);

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error running SQL script:", error);
  } finally {
    await pool.end(); // Close the connection pool
  }
}

// Call the function to run the SQL script
runSQLScript();

export default pool;
