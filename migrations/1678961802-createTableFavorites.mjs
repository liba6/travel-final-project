export async function up(sql) {
  await sql`
    CREATE TABLE favorites (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      attraction varchar(200) NOT NULL,
      address varchar(200),
      website varchar(500),
      phone varchar(20),
      user_id integer REFERENCES users(id)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE favorites
  `;
}
