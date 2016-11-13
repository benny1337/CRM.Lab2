using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;

namespace CRM.Lab2.Repository
{
    public class AccountRepo
    {
        private CRMWebAPI _api;

        public AccountRepo()
        {
            _api = new API().Connection;
        }

        public async Task<Guid> GetAccountIdByExternalIdAsync(string id)
        {
            var result = await _api.GetList("accounts", new CRMGetListOptions()
            {
                Select = new List<string>() { "accountid" }.ToArray(),
                Filter = $@"stq_externalid eq '{id}'",
            });
            if((result?.List?.Count ?? 0) < 1)
                return Guid.Empty;

            return new Guid((result.List.FirstOrDefault() as dynamic).accountid);
        }

    }
}
