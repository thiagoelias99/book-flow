use diesel::prelude::*;

use crate::{domain::entities::user::User, infrastructure::db::connection::establish_connection};

pub struct UserRepository {}

impl UserRepository {
    pub fn new() -> Self {
        UserRepository {}
    }

    pub fn find_all(&self) -> Result<Vec<User>, String> {
        let connection = &mut establish_connection();

        let users = crate::schema::users::table
            .load::<User>(connection)
            .expect("Error loading users");

        Ok(users)
    }

    pub fn find_by_user_name(&self, user_name: &str) -> Option<User> {
        let connection = &mut establish_connection();

        crate::schema::users::table
            .filter(crate::schema::users::user_name.eq(user_name))
            .first::<User>(connection)
            .optional()
            .expect("Error loading user")
    }

    pub fn save(&self, user: User) -> Result<User, String> {
        let connection = &mut establish_connection();

        let new_user = diesel::insert_into(crate::schema::users::table)
            .values(&user)
            .returning(crate::schema::users::dsl::users::all_columns())
            .get_result(connection)
            .expect("Error saving user");

        Ok(new_user)
    }
}
