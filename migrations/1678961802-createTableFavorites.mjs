export async function up(sql) {
  await sql`
    CREATE TABLE favorites (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      attraction varchar(200) NOT NULL,
      address varchar(200) NOT NULL,
      website varchar(500) NOT NULL,
      phone varchar(20) NOT NULL,
      user_id integer REFERENCES users(id) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE favorites
  `;
}
