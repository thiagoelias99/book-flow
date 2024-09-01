use crate::domain::services::user_services::UserServices;

pub fn get_user_by_user_name(user_name: &str, user_services: &UserServices) -> String {
    let user = user_services.find_user_by_user_name(user_name);

    //Return user serialized as JSON
    serde_json::to_string(&user).unwrap()
}
