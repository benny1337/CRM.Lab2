using CRM.Lab2.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;

namespace CRM.Lab2.Repository
{
    public class ProductRepo
    {
        private CRMWebAPI _api;

        public ProductRepo()
        {
            _api = new API().Connection;
        }

        public async Task<IEnumerable<Product>> Products()
        {
            try
            {
                var result = await _api.GetList("stq_products", new CRMGetListOptions()
                {
                    Select = new List<string>() { "stq_name", "stq_price", "stq_text", "stq_imgurl", "stq_productid", "stq_supplier", "stq_otherimagescsv", "stq_attributescsv", "stq_subtitle" }.ToArray()                    
                });
                

                return result.List.Select<dynamic, Product>((e) => {
                    return new Product()
                    {
                        Name = e.stq_name,
                        Price = e.stq_price ?? 0,
                        ImgUrl = e.stq_imgurl,
                        Text = e.stq_text,
                        Id = new Guid(e.stq_productid),
                        Supplier = e.stq_supplier, 
                        AttributesCSV = e.stq_attributescsv,
                        OtherImagesCSV = e.stq_otherimagescsv,
                        Subtitle = e.stq_subtitle
                    };
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }

        }
    }
}
