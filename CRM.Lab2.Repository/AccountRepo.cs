using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xrm.Tools.WebAPI;

namespace CRM.Lab2.Repository
{
    public class AccountRepo
    {
        private CRMWebAPI _api;

        public AccountRepo()
        {
            _api = new API().Connection;
        }

        public Guid GetAccountIdByExternalId(string id)
        {
            return Guid.Empty;
        }

    }
}
