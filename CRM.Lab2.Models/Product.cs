using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Lab2.Models
{
    public class Product
    {
        private string _name;
        public string Name
        {
            get
            {
                return _name;
            }
            set
            {
                _name = value;
                SeoName = _name.ToSeoName();
            }
        }
        public string Text { get; set; }
        public string ImgUrl { get; set; }
        public double Price { get; set; }
        public Guid Id { get; set; }
        public string Supplier { get; set; }
        public string OtherImagesCSV { get; set; }
        public string AttributesCSV { get; set; }
        public string SeoName { get; set; }
    }
}
