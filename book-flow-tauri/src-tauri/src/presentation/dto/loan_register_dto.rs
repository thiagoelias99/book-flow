use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct LoanRegisterDto {
    pub book_id: String,
    pub user_id: String,
    pub return_date: String,
}
