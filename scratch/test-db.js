const { createPool } = require('mariadb');
const poolConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'dbdev_clickservico',
  connectionLimit: 1
};

async function test() {
  console.log('Testando conexão com:', { ...poolConfig, password: '****' });
  const pool = createPool(poolConfig);
  try {
    const conn = await pool.getConnection();
    console.log('Conexão estabelecida com sucesso!');
    const rows = await conn.query('SELECT 1 as result');
    console.log('Query result:', rows);
    conn.release();
  } catch (err) {
    console.error('Erro na conexão:', err);
  } finally {
    pool.end();
  }
}

test();
