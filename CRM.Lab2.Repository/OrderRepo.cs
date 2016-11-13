using CRM.Lab2.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xrm.Tools.WebAPI;

namespace CRM.Lab2.Repository
{
    public class OrderRepo
    {
        private CRMWebAPI _api;

        public OrderRepo()
        {
            _api = new API().Connection;
        }



        public void SaveOrders(IEnumerable<Order> orders)
        {
            var accountrepo = new AccountRepo();
            var convertedOrders = orders.Select<Order, object>((o) =>
            {
                var accountid = accountrepo.GetAccountIdByExternalId(o.UserId);
                dynamic order = new ExpandoObject();
                order.name = "web order";
                order.order_details = o.OrderRows.Select((row) =>
                    {
                        return new
                        {
                            productdescription = row.ProductName,
                            quantity = row.Count,
                            priceperunit = row.PricePerUnit,
                            extendedamount = row.Count * row.PricePerUnit
                        };
                    });

                if (accountid != Guid.Empty)
                {
                    var orderIndexer = order as IDictionary<string, Object>;
                    orderIndexer["customerid_account@odata.bind"] = "/accounts(" + accountid + ")";
                }
                else
                {
                    order.customerid_account = new
                    {
                        name = o.UserFullName,
                        emailaddress1 = o.UserEmail,
                        stq_externalid = o.UserId
                    };
                }               

                return order;
               
            });
            foreach (var order in convertedOrders)
            {
                var orderid = _api.Create("salesorders", order).Result;
            }
        }
    }
}
