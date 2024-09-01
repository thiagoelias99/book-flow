use crate::{
    domain::entities::user::User, infrastructure::repositories::user_repository::UserRepository,
};

pub struct UserServices {
    user_repository: UserRepository,
}

impl UserServices {
    pub fn new(user_repository: UserRepository) -> Self {
        UserServices {
            user_repository: user_repository,
        }
    }

    pub fn find_user_by_user_name(&self, user_name: &str) -> Option<User> {
        self.user_repository.find_by_user_name(user_name)
    }
}
