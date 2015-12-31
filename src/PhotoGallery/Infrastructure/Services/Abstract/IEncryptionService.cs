using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoGallery.Infrastructure.Services
{
    public interface IEncryptionService
    {
        /// <summary>
        /// Creates a random salt
        /// </summary>
        /// <returns></returns>
        string CreateSalt();
        /// <summary>
        /// Generates a Hashed password
        /// </summary>
        /// <param name="password"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        string EncryptPassword(string password, string salt);
    }
}
