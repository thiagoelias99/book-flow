#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct UserLevel {
    pub slug: String,
    pub description: String,
}
