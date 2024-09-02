use diesel::prelude::*;

use crate::{domain::entities::user::User, infrastructure::db::connection::establish_connection, presentation::dto::updated_user_role_dto::UpdatedUserRoleDto};

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

    pub fn find_by_user_id(&self, id: &str) -> Result<User, String> {
        let connection = &mut establish_connection();

        let user = crate::schema::users::table
            .filter(crate::schema::users::id.eq(id))
            .first::<User>(connection)
            .optional()
            .expect("Error loading user");

        match user {
            Some(user) => Ok(user),
            None => Err(String::from("User does not exist")),
        }
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

    pub fn set_level(&self, user: UpdatedUserRoleDto) -> Result<User, String> {
        let connection = &mut establish_connection();

        let updated_user = diesel::update(crate::schema::users::table.find(&user.id))
            .set(crate::schema::users::level.eq(user.level))
            .get_result(connection)
            .expect("Error updating user");

        Ok(updated_user)
    }
}
