using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace IC_OnBoarding_task.Models
{
    public partial class Staff
    {
        public int StaffId { get; set; }
        public string Name { get; set; }
        public int? RoleId { get; set; }
        public string Location { get; set; }
        public int? StaffAssignment { get; set; }
        public int? TransactionHead { get; set; }

        public virtual Role Role { get; set; }
    }
}
