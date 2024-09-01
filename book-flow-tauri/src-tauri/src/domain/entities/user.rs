use diesel::{Queryable, Selectable};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Selectable)]
#[diesel(table_name = crate::schema::users)] // Set the table name
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct User {
    // Must be in same order as in schema.rs
    pub id: String,
    pub name: String,
    pub user_name: String,
    pub password: String,
    pub level: String,
}
