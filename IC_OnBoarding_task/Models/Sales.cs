using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace IC_OnBoarding_task.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public string Customer { get; set; }
        public int? ProductId { get; set; }
        public string Product { get; set; }
        public int? StoreId { get; set; }
        public string Store { get; set; }
        public string DateSold { get; set; }

        public virtual Customer CustomerNavigation { get; set; }
        public virtual Product ProductNavigation { get; set; }
        public virtual Store StoreNavigation { get; set; }
    }
}
