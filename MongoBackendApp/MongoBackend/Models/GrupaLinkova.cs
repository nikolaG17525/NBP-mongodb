using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace MongoBackend.Models
{
    public class GrupaLinkova
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string ImeGrupe { get; set; } = null!;

        [BsonElement("linkovi")]
        [JsonPropertyName("linkovi")]
        public List<Link> linkovi { get; set; } = null!;
    }
}
