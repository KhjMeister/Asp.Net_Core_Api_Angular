using System;
using System.ComponentModel.DataAnnotations;
namespace DatingApp.Dtos
{
    public class UserForRegesterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8,MinimumLength = 4,ErrorMessage = "پسورد شما حداقل باید 4 و حداکثر 8 کاراکتر داشته باشد")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }
        
        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }
        public UserForRegesterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }


    }
}