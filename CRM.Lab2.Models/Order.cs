using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace CRM.Lab2.Models
{
    
    public class Order
    {              
        public object _id { get; set; }
        public string UserId { get; set; }
        public string UserFullName { get; set; }
        public string UserEmail { get; set; }
        public DateTime Date { get; set; }        
        public OrderStatus Status { get; set; }
        public IEnumerable<OrderRow> OrderRows { get; set; }

        public Order()
        {
            OrderRows = new List<OrderRow>();
        }

        public static Order CreateOrderFromDynamic(dynamic obj)
        {
            var rows = new List<OrderRow>();
            foreach(var row in obj.OrderRows)
            {
                rows.Add(new OrderRow()
                {
                    Count = Int32.Parse(row.Count),
                    PricePerUnit = row.Product.Price,
                    ProductName = row.Product.Name
                });
            }
            return new Order()
            {
                Date = obj.Date,
                UserId = obj.UserId,
                Status = (OrderStatus)obj.Status,
                OrderRows = rows,
                UserEmail = obj.UserEmail,
                UserFullName = obj.UserFullName
            };
        }
    }   

    public enum OrderStatus
    {
        Pending = 0,
        Placed = 1,
        Done = 2
    }
}
