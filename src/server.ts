import { Pool } from 'pg';


import express, {
  type Application,
  type Request,
  type Response
} from "express"


const app: Application = express()
const port = 5000
app.use(express.json())

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_4TL9VtBXDuiS@ep-blue-boat-az9d7kf5.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
})

const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT, 
            is_Active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

            );
          `)
    console.log("Database created successfully");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is rot Route"
  })
})

app.post("/api/v1/users", async (req: Request, res: Response) => {

  try {
    const { name, email, password, age } = req.body

    const result = await pool.query(`
         INSERT INTO users (name,email,password,age) VALUES
         ($1,$2,$3,$4) RETURNING *
      `, [name, email, password, age])

    // console.log(result);

    res.status(201).json({
      success: true,
      message: " user created",
      data: result.rows[0]
    })

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error?.message,
      error : error

    });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})