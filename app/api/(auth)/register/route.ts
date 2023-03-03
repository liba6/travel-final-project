import bcrypt from 'bcrypt';
import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { z } from 'zod';

import {
  createUser,
  getUserByUsername,
} from '../../../database/users';

const userSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

 export type RegisterResponseBody = 
   | {errors: {message: string}[]} 
   | {user:{username:string}};

export const POST = async (request: NextRequest) => {

    // 1. check if no empty fields
const body = await request.json();
const result = userSchema.safeParse(body);

if(!result.success){
    return NextResponse.json({errors: result.error.issues,}, {status:400},)
}

if (!result.data.username || !result.data.password) {
    return NextResponse.json(
        {errors: [{message: 'username or password is empty'}]}, 
        {status: 400},
    );
}
    // 2. check if user exists already
const user = await getUserByUsername(result.data.username)

if (user) {
    return NextResponse.json({errors: [{message: 'username is already taken'}]}, 
    {status: 400},
    )
}

    // 3. hash the password
const passwordHash = await bcrypt.hash(result.data.password,12)
console.log(passwordHash)
    // 4. create the user
const newUser = await createUser(result.data.username,passwordHash);
    
    // 5. return msg/new username created
if (!newUser) {
    return NextResponse.json(
        {errors: [{message:'user creation failed'}]},
        {status:500},
    );
}

return NextResponse.json({user: {username: newUser.username}})

};