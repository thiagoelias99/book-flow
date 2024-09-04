use diesel::{RunQueryDsl, Table};

use crate::{domain::entities::loan::Loan, infrastructure::db::connection::establish_connection};

pub struct LoanRepository {}

impl LoanRepository {
    pub fn new() -> Self {
        LoanRepository {}
    }

    pub fn save(&self, data: Loan) -> Result<Loan, String> {
        let connection = &mut establish_connection();

        let loan = diesel::insert_into(crate::schema::loans::table)
            .values(&data)
            .returning(crate::schema::loans::dsl::loans::all_columns())
            .get_result(connection)
            .expect("Error saving user");

        Ok(loan)
    }

    pub fn get_all(&self) -> Result<Vec<Loan>, String> {
        let connection = &mut establish_connection();

        let loans = crate::schema::loans::dsl::loans
            .load::<Loan>(connection)
            .expect("Error loading loans");

        Ok(loans)
    }
}
