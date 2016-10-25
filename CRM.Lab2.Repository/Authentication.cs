using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace CRM.Lab2.Repository
{
    public class Authentication
    {
        const string clientId = "";        
        const string commonAuthority = "https://login.microsoftonline.com/common";
        const string appUrl = "https://crmlab2.crm4.dynamics.com";
        const string username = "";
        const string password = "";        

        public async Task<string> GetTokenAsync()
        {
            try
            {   
                var authContext = new AuthenticationContext(commonAuthority);
                if (authContext.TokenCache.ReadItems().Count() > 0)
                    authContext = new AuthenticationContext(authContext.TokenCache.ReadItems().First().Authority);                
                var authResult = await authContext.AcquireTokenAsync(appUrl, clientId, new UserPasswordCredential(username, password));
                return authResult.AccessToken;
            } catch(Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
            
        }
    }
}
