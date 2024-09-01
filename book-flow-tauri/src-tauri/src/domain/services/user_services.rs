pub struct UserServices<T: UserRepository> {
    user_repository: T,
}

impl<T: UserRepository> UserServices<T> {
    pub fn new(user_repository: T) -> Self {
        UserServices { user_repository }
    }

    pub fn register_user(&self, user: UserCreateDto) -> Result<User, diesel::result::Error> {
        self.user_repository.save(&user).await?;
        Ok(())
    }

    pub fn find_user_by_user_name(&self, user_name: &str) -> Option<User> {
        self.user_repository.find_by_user_name(user_name).await
    }
}
