use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct BookRegisterDto {
    pub title: String,
    pub author: String,
    pub isbn: String,
    pub status: String,
}
