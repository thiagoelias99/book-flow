use crate::{
    domain::{entities::user::User, services::user_services::UserServices},
    presentation::dto::user_register_dto::UserRegisterDto,
};

pub fn register_user_from_dto(
    user_register_dto: UserRegisterDto,
    user_services: &UserServices,
) -> Result<User, String> {
    
    // Check if user already exists
    let user = user_services.find_user_by_user_name(&user_register_dto.user_name);

    if user.is_some() {
        return Err(String::from("User already exists"));
    }

    // Save user entity
    user_services.register_user(user_register_dto)
}
