import express, { Request, Response } from 'express';
import { Pool  } from 'pg';

const app = express();
const port = 5000; 

app.use(express.json());

// Configurar a conexão com o banco de dados
const pool = new Pool({
  user: 'deborahwyny',
  host: 'localhost',
  database: 'ramdom_people', 
  password: '2506', 
  port: 5432,
});

// Rota /person
app.get('/person', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT id, "firstName", "lastName"
      FROM people
      ORDER BY random()
      LIMIT 1
    `);

    client.release();

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Nenhuma pessoa encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pessoa.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
