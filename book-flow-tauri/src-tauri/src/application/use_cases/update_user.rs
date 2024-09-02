use crate::{
    domain::{entities::user::User, services::user_services::UserServices},
    presentation::dto::updated_user_role_dto::UpdatedUserRoleDto,
};

pub fn update_user_role(
    data: UpdatedUserRoleDto,
    user_services: &UserServices,
) -> Result<User, String> {
    // Check if user exists
    let user = user_services.find_user_by_id(&data.id);

    // If user does not exist, return error
    if user.is_err() {
        return Err(String::from("User does not exist"));
    }

    // Update user entity
    user_services.set_user_level(data)
}
