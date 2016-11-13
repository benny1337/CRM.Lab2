using CRM.Lab2.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Lab2.ProductWebJob
{
    public class Mongo
    {
        private string userName = "crmlab2";
        private string host = "crmlab2.documents.azure.com";
        private string password = "XHymuQ09omwCqAab21KdAqnWANyvS7xGug7v53HqC2LgF9HR9KIpaifblTMvbfRteMHPX1V4oTMog3glpzcG8w==";
        private string dbName = "admin";        
        private IMongoDatabase _db;


        public Mongo()
        {
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
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Product> GetProductCollectionForEdit()
        {   
            return _db.GetCollection<Product>("products");
        }

        public IMongoCollection<dynamic> GetOrderCollectionForEdit()
        {
            return _db.GetCollection<dynamic>("orders");
        }
    }
}
