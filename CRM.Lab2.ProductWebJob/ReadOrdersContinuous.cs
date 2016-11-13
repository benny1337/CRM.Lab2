using CRM.Lab2.Repository;
using Microsoft.Azure.WebJobs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Newtonsoft.Json;
using CRM.Lab2.Models;
using MongoDB.Driver;
using System.Security.Authentication;
using MongoDB.Bson;

namespace CRM.Lab2.ProductWebJob
{
    public class ReadOrdersContinuous
    {

        static ReadOrdersContinuous()
        {
        }

        public static void StartupJob([TimerTrigger("0 */10 * * * *", RunOnStartup = true)] TimerInfo timerInfo, TextWriter log)
        {
            Console.WriteLine("read orders from spa continuously - started");
            var repo = new OrderRepo();
            var db = new Mongo();

            var collection = db.GetOrderCollectionForEdit();
            var filter = Builders<dynamic>.Filter.Eq("Status", OrderStatus.Pending);

            var orders = collection.Find(filter);
            repo.SaveOrders(orders.ToEnumerable().Select<dynamic, Order>(x => Order.CreateOrderFromDynamic(x)));


            var update = Builders<dynamic>.Update.Set("Status", (int)OrderStatus.Placed);
            collection.UpdateMany(filter, update);
        }



    }
}
