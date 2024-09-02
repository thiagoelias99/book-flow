use crate::{
    domain::{entities::user::User, services::user_services::UserServices},
    presentation::dto::login::LoginDto,
};

pub fn login_from_user_name(data: LoginDto, user_services: &UserServices) -> Result<User, String> {
    // Get user from database
    let user = user_services.find_user_by_user_name(&data.user_name);

    // Check if user exists
    // Check if password is correct
    // Return user if everything is correct
    match user {
        Some(user) => {
            if user.password == data.password {
                Ok(user)
            } else {
                Err(String::from("Password is incorrect"))
            }
        }
        None => Err(String::from("User does not exist")),
    }
}
