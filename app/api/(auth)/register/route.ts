import { NextRequest } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

export const POST = async (request: NextRequest) => {

    // 1. check if no empty fields
const body = await request.json();
const result = userSchema.safeParse(body);
    // 2. check if user exists
    // 3. hash the password
    // 4. create the user
    // 5. return msg/new username created


};