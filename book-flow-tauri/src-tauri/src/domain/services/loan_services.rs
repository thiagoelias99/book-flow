use uuid::Uuid;
use chrono::prelude::*;

use crate::{domain::entities::loan::Loan, infrastructure::repositories::loan_repository::LoanRepository, presentation::dto::loan_register_dto::LoanRegisterDto};

pub struct LoanServices {
    repository: LoanRepository,
}

impl LoanServices {
    pub fn new(repository: LoanRepository) -> Self {
        LoanServices {
            repository: repository,
        }
    }

    pub fn register_loan(&self, data: LoanRegisterDto) -> Result<Loan, String> {
        let id = Uuid::new_v4().to_string();

        let today: String = Utc::now().to_string();

        let loan = Loan {
            id: id,
            book_id: data.book_id,
            user_id: data.user_id,
            loan_date: today,
            return_date: data.return_date,
            status: "approved".to_string(),
        };

        self.repository.save(loan)
    }
}
