using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_AnnabelleBaker.API.Models;

namespace Mission11_AnnabelleBaker.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreContext _bookContext;

        public BookController(BookstoreContext temp)
        {
            _bookContext = temp;
        }
        [HttpGet("AllBooks")] // way of routing to see all books in database

        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, bool sort = false)
        {
            IQueryable<Book> x = _bookContext.Books;

            if (sort) // if sort is true, order by Title
            {
                x = x.OrderBy(b => b.Title);
            }

            var totalNumBooks = _bookContext.Books.Count(); // get a count

            var paginatedBooks = x
            .Skip((pageNum - 1) * pageSize) // take 2-1=1, then multiply by 5 to get 10
            .Take(pageSize) // only want to take 5, it's probably best to edit this in VS
            .ToList();


            var someObject = new
            {
                Books = paginatedBooks,
                totalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

    }
}
