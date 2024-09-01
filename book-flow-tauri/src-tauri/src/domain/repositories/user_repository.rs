use async_trait::async_trait;

#[async_trait]
pub trait UserRepository {
    async fn find_by_user_name(&self, user_name: &str) -> Option<User>;
    async fn save(&self, user: &UserCreateDto) -> Result<(), diesel::result::Error>;
}