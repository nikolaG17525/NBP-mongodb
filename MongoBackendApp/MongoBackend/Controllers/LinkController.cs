using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoBackend.Services;
using MongoBackend.Models;
using MongoDB.Driver.Core.Operations;


namespace MongoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkController : ControllerBase
    {
        private readonly MongoDBService _mongoDBService;

        public LinkController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet]
        public async Task<List<GrupaLinkova>> Get() {
            return await _mongoDBService.GetAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GrupaLinkova grupaLinkova) {
            await _mongoDBService.CreateAsync(grupaLinkova);
            return CreatedAtAction(nameof(Get), new { id = grupaLinkova.Id }, grupaLinkova);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AddToGrupaLinkova(string id, [FromBody] Link link) {
            await _mongoDBService.AddToGrupaLinkovaAsync(id, link.ImeLinka, link.AdresaLinka);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id) {
            await _mongoDBService.DeleteAsync(id); 
            return NoContent();    
        }

        [HttpPut]
        public async Task<IActionResult> DeleteLinkAsync(string id, string adresaLinka)
        {
            await _mongoDBService.DeleteLinkAsync(id, adresaLinka);
            return NoContent();
        }
    }
}
