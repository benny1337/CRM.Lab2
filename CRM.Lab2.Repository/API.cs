using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.WindowsAzure.ActiveDirectory.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xrm.Tools.WebAPI;

namespace CRM.Lab2.Repository
{
    public class API
    {
        const string crmBaseUrl = "https://crmlab2.crm4.dynamics.com";
        public CRMWebAPI Connection
        {
            get
            {
                var auth = new Authentication();
                var token = auth.GetTokenAsync().Result;
                CRMWebAPI api = new CRMWebAPI(crmBaseUrl + "/api/data/v8.0/", token);
                return api;
            }
        }
    }
}
