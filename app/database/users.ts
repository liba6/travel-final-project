import { sql } from './connect';

type User = {
    id: number;
    username: string;
    password_hash: string;
}

export async function getUserByUsername(username:string) {

        const [user] = await sql<User[]>`
          SELECT
            *
          FROM
            users
          WHERE
            username = ${username}
        `;
        return user;
      
}