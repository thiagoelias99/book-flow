use diesel::{prelude::Insertable, Queryable, Selectable};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::books)] // Set the table name
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Book {
    // Must be in same order as in schema.rs
    pub id: String,
    pub title: String,
    pub author: String,
    pub isbn: String,
    pub status: String
}
