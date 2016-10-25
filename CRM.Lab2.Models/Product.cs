using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Lab2.Models
{
    public class Product
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public string ImgUrl { get; set; }
        public double Price { get; set; }
        public Guid Id { get; set; }
    }
}
