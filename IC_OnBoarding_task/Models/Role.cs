using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace IC_OnBoarding_task.Models
{
    public partial class Role
    {
        public Role()
        {
            Staff = new HashSet<Staff>();
        }

        public string RoleName { get; set; }
        public int RoleId { get; set; }

        public virtual ICollection<Staff> Staff { get; set; }
    }
}
