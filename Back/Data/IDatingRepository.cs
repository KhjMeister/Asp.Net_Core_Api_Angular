using System.Threading.Tasks;
using System.Collections.Generic;
using DatingApp.Models;
using DatingApp.Helpers;

namespace DatingApp.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T etity) where T: class;

         void Delete <T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<PagedList<User>> GetUsers(UserParams userParams);

         Task<User> GetUser(int id);

         Task <Photo> GetPhoto(int id);

         Task<Photo> GetMainPhotoForUser(int userId);

         Task<Like> GetLike(int userId,int recipientId);
    }
}