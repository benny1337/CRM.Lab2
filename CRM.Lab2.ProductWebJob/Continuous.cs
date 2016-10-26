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
    public class Continuous
    {

        static Continuous()
        {
        }

        public static void StartupJob([TimerTrigger("0 */1 * * * *", RunOnStartup = true)] TimerInfo timerInfo, TextWriter log)
        {
            Console.WriteLine("continuous started");
            var repo = new ProductRepo();
            var db = new Mongo();
            var prods = repo.Products().Result;
            
            var collection = db.GetProductCollectionForEdit();
            foreach (var prod in prods)
            {
                var filter_id = Builders<Product>.Filter.Eq("Id", prod.Id);

                collection.FindOneAndDelete<Product>(filter_id);
                collection.InsertOne(prod);
            }            
        }

        
    }
}
