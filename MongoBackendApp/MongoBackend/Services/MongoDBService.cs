using Microsoft.Extensions.Options;
using MongoBackend.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MongoBackend.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<GrupaLinkova> _grupaLinkova;
        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _grupaLinkova = database.GetCollection<GrupaLinkova>(mongoDBSettings.Value.CollectionName);
        }

        public async Task CreateAsync(GrupaLinkova grupaLinkova)
        {
            await _grupaLinkova.InsertOneAsync(grupaLinkova);
            return;
        }

        public async Task<List<GrupaLinkova>> GetAsync()
        {
            return await _grupaLinkova.Find(new BsonDocument()).ToListAsync();
        }

        public async Task AddToGrupaLinkovaAsync(string Id, string imeLinka, string adresaLinka)
        {
            FilterDefinition<GrupaLinkova> filter = Builders<GrupaLinkova>.Filter.Eq("Id", Id);
            UpdateDefinition<GrupaLinkova> update = Builders<GrupaLinkova>.Update.AddToSet<Link>("linkovi", new Link(imeLinka, adresaLinka));
            await _grupaLinkova.UpdateOneAsync(filter, update);
        }

        public async Task DeleteAsync(string Id)
        {
            FilterDefinition<GrupaLinkova> filter = Builders<GrupaLinkova>.Filter.Eq("Id", Id);
            await _grupaLinkova.DeleteOneAsync(filter);
            return;
        }

        public async Task DeleteLinkAsync(string Id, string adresaLinka)
        {
            FilterDefinition<GrupaLinkova> filter = Builders<GrupaLinkova>.Filter.Eq("Id", Id);
            
            var update = Builders<GrupaLinkova>.Update.PullFilter("linkovi",
        Builders<Link>.Filter.Eq("AdresaLinka", adresaLinka));

            await _grupaLinkova.UpdateOneAsync(filter, update);
            return;
        }
    }
}
