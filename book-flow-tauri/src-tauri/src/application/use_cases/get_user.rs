use crate::domain::{entities::user::User, services::user_services::UserServices};

pub fn get_user_by_user_name(user_name: &str, user_services: &UserServices) -> Option<User> {
    user_services.find_user_by_user_name(user_name)
}

pub fn get_all(user_services: &UserServices) -> Result<Vec<User>, String> {
    user_services.get_all()
}
