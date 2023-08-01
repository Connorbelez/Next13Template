import 'server-only';

import {ColumnType, Generated, Insertable, Selectable, Updateable, Kysely, InsertResult} from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale';
import { v4 as uuidv4} from 'uuid';


export interface UserTable {
  id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
  name: string;
  username: string;
  email: string;
  admin: boolean;
  event_creator: boolean;
  ksig: boolean | null;
  password: string | null;
  gender: "male"| "female" | "other" | null;
  image: string | null;
  events_created: number | null;
  events_attended: number | null;
  events_reviewed: number | null;
  events_cancelled: number | null;

}
export type SelectUser = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>


export async function insertUser(
    name: string,
    username: string,
    email: string,
    admin: boolean,
    event_creator: boolean
) {
  try {
    const newuser : NewUser = {
      id: uuidv4(),
      name: name,
      username: username,
      email: email,
      admin: admin,
      event_creator: event_creator,
    }

    const result : InsertResult = await queryBuilder
        .insertInto('users')
        .values(newuser)
        .executeTakeFirstOrThrow();

    return result;
  } catch (error) {
    // Log the error or handle it based on your application's requirements
    console.error('Error inserting user:', error);

    // Throw the error to propagate it further up the call stack if needed
    throw new Error('Failed to insert user. Please try again later.');
  }
}


export async function getUserRoleByEmail(email:string) {
  const users = await queryBuilder
      .selectFrom('users')
      .select(["id","email","admin","event_creator"])
      .where("email","=",email)
      .execute();

  console.log("\n\n USERS FROM AUTH API", users);
  if(users.length > 0){
    return users[0].admin
  }
  return 0;

}

interface GetActiveDB {
  users: UserTable;

  // https://github.com/nextauthjs/next-auth/issues/4922
}


export const queryBuilder = new Kysely<GetActiveDB>({
  dialect: new PlanetScaleDialect({
    //@ts-ignore
    url: process.env.DATABASE_URL
  })
});
