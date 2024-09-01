use crate::{
    domain::entities::user::User, infrastructure::repositories::user_repository::UserRepository, presentation::dto::user_register_dto::UserRegisterDto,
};
use uuid::Uuid;

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

    pub fn register_user(&self, user: UserRegisterDto) -> Result<User, String> {
        let id = Uuid::new_v4().to_string();
        let user = User {
            id: id,
            name: user.name,
            user_name: user.user_name,
            password: user.password,
            level: user.level,
        };
        self.user_repository.save(user)
    }
}
