#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct User {
    pub id: String,
    pub name: String,
    pub user_name: String,
    pub password: String,
    pub level: String,
}