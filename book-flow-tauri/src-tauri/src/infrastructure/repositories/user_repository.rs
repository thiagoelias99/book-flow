use diesel::prelude::*;

use crate::{domain::entities::user::User, infrastructure::db::connection::establish_connection};

pub struct UserRepository {}

impl UserRepository {
    pub fn new() -> Self {
        UserRepository {}
    }

    pub fn find_by_user_name(&self, user_name: &str) -> Option<User> {
        let connection = &mut establish_connection();

        crate::schema::users::table
            .filter(crate::schema::users::user_name.eq(user_name))
            .first::<User>(connection)
            .optional()
            .expect("Error loading user")
    }
}
