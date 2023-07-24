import 'server-only';

import { ColumnType, Generated, Insertable, Selectable, Updateable, Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale';
import { Key } from 'readline';

// interface User {
//   id: Generated<number>;
//   name: string;
//   username: string;
//   email: string;
// }

// interface Database {
//   users: User;
//   // https://github.com/nextauthjs/next-auth/issues/4922
// }
interface EventContent {
  description: string,
  images: string,
}

export interface EventInterface {
  id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
  event_creator : string,
  event_title : string,
  event_headline : string,
  event_content : EventContent,
  event_date : string,
  event_start_time : string,
  event_end_time : Date,
  max_tickets : number,
  drinks_included : Boolean,
  event_location : string,
  ticket_price : number,
  hero_image : string,
}




export interface EventTable {
  id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
  event_creator_id : Generated<string>, // Foriegn Key to UserTable row
  event_creator : string,
  is_18_plus : boolean | null,
  is_public : boolean | null,
  min_age : number | null,
  event_title : string,
  event_headline : string,
  event_content : string | null | EventContent,
  event_date : string,
  event_start_time : string | Date,
  event_end_time : Date | string,
  max_tickets : number | null,
  drinks_included : boolean | null,
  event_location : string,
  ticket_price : number,
  hero_image : string,
  ticket_image : string | null,
  ticket_logo : string | null,
  
  cash_payment_enabled : boolean,
  credit_payment_enabled : boolean,
  etransfer_payment_enabled : boolean,
  free_payment_enabled : boolean,


  event_complete : boolean,
  event_cancelled : boolean,
  event_cancelled_reason : string | null,
  event_cancelled_by : string | null,
  event_cancelled_by_id : number | null,
  event_cancelled_at : Date | string | null,
  
  allow_reviews : boolean | null,
  allow_comments : boolean | null,

}

export type SelectEvent = Selectable<EventTable>
export type NewEvent = Insertable<EventTable>
export type EventUpdate = Updateable<EventTable>

//Relationship Table
export interface ReviewTable {
  id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
  event_id: Generated<string>; // Foriegn Key to EventTable row
  review_author_id: number; // Foriegn Key to UserTable row
  review_title: string;
  review_content: string | null;
  review_rating: number | null;
  review_author: string;
  review_date: Date | string;
}

export type SelectReview = Selectable<ReviewTable>
export type NewReview = Insertable<ReviewTable>
export type ReviewUpdate = Updateable<ReviewTable>

export interface TicketTable {
  id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
  event_id: Generated<string>; // Foriegn Key to EventTable row
  ticket_holder_id: Generated<string>;

  ticket_holder_name: string;// Foriegn Key to UserTable row
  ticket_type: string | null;
  ticket_price : number ;
  ticket_logo : string | null;
  drinks_included:boolean | null;
  payment_method : "cash" | "credit" | "etransfer" | "free";
  payment_complete : boolean | null;
  payment_required : boolean | null;

  ticket_cancelled : boolean | null;
  ticket_cancelled_reason : string | null;


}
export type SelectTicket = Selectable<TicketTable>
export type NewTicket = Insertable<TicketTable>
export type TicketUpdate = Updateable<TicketTable>


export interface UserTable {
id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
  name: string;
  username: string;
  email: string;
  admin: boolean;
  event_creator: boolean;
  password: string | null;
  gender: "male"| "female" | "other" | null;
  image: string | null;
  events_created: number | null;
  events_attended: number | null;
  events_reviewed: number | null;
  events_cancelled: number | null;

  // created_at: ColumnType<Date, string | undefined, never>;
  // updated_at: ColumnType<Date, string | undefined, never>;
  
}
export type SelectUser = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>


interface EventDatabase {
  Event: EventInterface;
  event_table: EventTable;
  review_table: ReviewTable;
  ticket_table: TicketTable;
  user_table: UserTable;

  // https://github.com/nextauthjs/next-auth/issues/4922
}

// @ts-ignore


export async function findEvents(criteria: Partial<SelectEvent>) {
  let query = queryBuilder.selectFrom('event_table')
  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }
  if (criteria.event_creator) {
    query = query.where('event_creator', '=', criteria.event_creator) // Kysely is immutable, you must re-assign!
  }
  if (criteria.event_creator_id) {
    query = query.where('event_creator_id', '=', criteria.event_creator_id) // Kysely is immutable, you must re-assign!
  }
  if (criteria.event_title) {
    query = query.where('event_title', '=', criteria.event_title) // Kysely is immutable, you must re-assign!
  }
  return await query.selectAll().execute()
}



export async function findUser(criteria: Partial<SelectUser>){
  let query = queryBuilder.selectFrom('user_table');
  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }
  if (criteria.name) {
    query = query.where('name', '=', criteria.name) // Kysely is immutable, you must re-assign!
  }
  if (criteria.username) {
    query = query.where('username', '=', criteria.username) // Kysely is immutable, you must re-assign!
  }
  if (criteria.email) {
    query = query.where('email', '=', criteria.email) // Kysely is immutable, you must re-assign!
  }
  if (criteria.admin) {
    query = query.where('admin', '=', criteria.admin) // Kysely is immutable, you must re-assign!
  }
  if (criteria.event_creator) {
    query = query.where('event_creator', '=', criteria.event_creator) // Kysely is immutable, you must re-assign!
  }
  return await query.selectAll().execute()


}




interface EventDatabase {
  Event: EventInterface;
  events: EventTable;
  reviews: ReviewTable;
  tickets: TicketTable;
  users: UserTable;

  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<EventDatabase>({
  dialect: new PlanetScaleDialect({
    //@ts-ignore
    url: process.env.DATABASE_URL
  })
});


// export interface Database {
//   person: PersonTable
//   pet: PetTable
// }

// export interface PersonTable {
//   // Columns that are generated by the database should be marked
//   // using the `Generated` type. This way they are automatically
//   // made optional in inserts and updates.
//   id: Generated<number>

//   first_name: string
//   gender: 'man' | 'woman' | 'other'

//   // If the column is nullable in the database, make its type nullable.
//   // Don't use optional properties. Optionality is always determined
//   // automatically by Kysely.
//   last_name: string | null

//   // You can specify a different type for each operation (select, insert and
//   // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
//   // wrapper. Here we define a column `created_at` that is selected as
//   // a `Date`, can optionally be provided as a `string` in inserts and
//   // can never be updated:
//   created_at: ColumnType<Date, string | undefined, never>
// }

// // You should not use the table schema interfaces directly. Instead, you should
// // use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// // make sure that the correct types are used in each operation.
// export type Person = Selectable<PersonTable>
// export type NewPerson = Insertable<PersonTable>
// export type PersonUpdate = Updateable<PersonTable>

// export interface PetTable {
//   id: Generated<number>
//   name: string
//   owner_id: number
//   species: 'dog' | 'cat'
// }

// export type Pet = Selectable<PetTable>
// export type NewPet = Insertable<PetTable>
// export type PetUpdate = Updateable<PetTable>





// export async function findPeople(criteria: Partial<Person>) {
//   let query = db.selectFrom('person')

//   if (criteria.id) {
//     query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
//   }

//   if (criteria.first_name) {
//     query = query.where('first_name', '=', criteria.first_name)
//   }

//   if (criteria.last_name !== undefined) {
//     query = query.where(
//       'last_name', 
//       criteria.last_name === null ? 'is' : '=', 
//       criteria.last_name
//     )
//   }

//   if (criteria.gender) {
//     query = query.where('gender', '=', criteria.gender)
//   }

//   if (criteria.created_at) {
//     query = query.where('created_at', '=', criteria.created_at)
//   }

//   return await query.selectAll().execute()
// }

// export async function updatePerson(id: number, updateWith: PersonUpdate) {
//   await db.updateTable('person').set(updateWith).where('id', '=', id).execute()
// }

// export async function createPerson(person: NewPerson) {
//   return await db.insertInto('person')
//     .values(person)
//     .returningAll()
//     .executeTakeFirstOrThrow()
// }

// export async function deletePerson(id: number) {
//   return await db.deleteFrom('person').where('id', '=', id)
//     .returningAll()
//     .executeTakeFirst()
// }