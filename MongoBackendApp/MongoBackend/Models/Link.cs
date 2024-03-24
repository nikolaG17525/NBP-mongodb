namespace MongoBackend.Models
{
    public class Link
    {
        public Link(string imeLinka, string adresaLinka)
        {
            ImeLinka = imeLinka;
            AdresaLinka = adresaLinka;
        }

        public string ImeLinka { get; set; }
        public string AdresaLinka { get; set; }
    }
}
