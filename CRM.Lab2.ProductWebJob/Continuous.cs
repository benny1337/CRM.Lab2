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

            var prods = repo.Products().Result;
            
            var collection = GetCollectionForEdit();
            foreach (var prod in prods)
            {
                var filter_id = Builders<Product>.Filter.Eq("Id", prod.Id);

                collection.FindOneAndDelete<Product>(filter_id);
                collection.InsertOne(prod);
            }            
        }

        public static void Save(IEnumerable<Product> products)
        {
           
        }

        private static IMongoCollection<Product> GetCollectionForEdit()
        {            
            var userName = "crmlab2";
            var host = "crmlab2.documents.azure.com";
            var password = "";
            var dbName = "admin";
            var collectionName = "products";

            MongoClientSettings settings = new MongoClientSettings();
            settings.Server = new MongoServerAddress(host, 10250);
            settings.UseSsl = true;
            settings.SslSettings = new SslSettings();
            settings.SslSettings.EnabledSslProtocols = SslProtocols.Tls12;

            MongoIdentity identity = new MongoInternalIdentity(dbName, userName);
            MongoIdentityEvidence evidence = new PasswordEvidence(password);

            settings.Credentials = new List<MongoCredential>()
            {
                new MongoCredential("SCRAM-SHA-1", identity, evidence)
            };
            MongoClient client = new MongoClient(settings);
            var database = client.GetDatabase(dbName);
            var todoTaskCollection = database.GetCollection<Product>(collectionName);
            return todoTaskCollection;
        }
    }
}
