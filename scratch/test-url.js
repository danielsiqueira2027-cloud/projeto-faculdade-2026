const DATABASE_URL = "mysql://root:@localhost:3306/dbdev_clickservico?charset=utf8mb4";
try {
  const dbUrl = new URL(DATABASE_URL);
  console.log({
    hostname: dbUrl.hostname,
    port: dbUrl.port,
    username: dbUrl.username,
    password: dbUrl.password,
    pathname: dbUrl.pathname,
    database: dbUrl.pathname.substring(1).split('?')[0]
  });
} catch (e) {
  console.error(e);
}
