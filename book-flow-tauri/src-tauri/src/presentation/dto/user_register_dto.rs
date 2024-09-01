use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct UserRegisterDto {
    pub name: String,
    pub user_name: String,
    pub level: String,
    pub password: String,
}
