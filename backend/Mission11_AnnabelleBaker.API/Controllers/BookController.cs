using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public IActionResult GetBooks(
            int pageSize = 10,
            int pageNum = 1,
            string sortBy = "title",
            string sortOrder = "asc",
            [FromQuery] List<string>? categories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            // Filter by category if provided
            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            // Apply sorting
            query = sortBy.ToLower() switch
            {
                "title" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title),
                "author" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author),
                "publisher" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Publisher) : query.OrderByDescending(b => b.Publisher),
                "price" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Price) : query.OrderByDescending(b => b.Price),
                _ => query.OrderBy(b => b.Title)
            };

            var totalNumBooks = query.Count();

            var paginatedBooks = query
            .Skip((pageNum - 1) * pageSize) // take 2-1=1, then multiply by 5 to get 10
            .Take(pageSize) // only want to take 5, it's probably best to edit this in VS
            .ToList();


            var someObject = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }
        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);

        }

        public IActionResult AddBook([FromBody] book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdatedBook/{id}")]
        public IActionResult UpdateBook(int id,[FromBody] book updatedBook)
        {
            var bookToUpdate = _bookContext.Books.Find(id);
            if (bookToUpdate == null)
            {
                return NotFound();
            }

            // update book - turning all the actual books in the database into updated information
            bookToUpdate.Title = updatedBook.Title;
            bookToUpdate.Author = updatedBook.Author;
            bookToUpdate.Publisher = updatedBook.Publisher;
            bookToUpdate.Category = updatedBook.Category;
            bookToUpdate.ISBN = updatedBook.Category;
            bookToUpdate.Classification = updatedBook.PageCount;
            bookToUpdate.Price = updatedBook.Price;

            _bookContext.Books.Update(bookToUpdate);
            _bookContext.SaveChanges();

            return Ok(bookToUpdate);
        }

        // deleting book from database
        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            var bookToDelete = _bookContext.Books.Find(id);
            if (bookToDelete == null)
            {
                return NotFound(new { message = "Book not found"});
            }

            _bookContext.Books.Remove(booksToDelete);
            _bookContext.SaveChanges();

            return NoContent(); 
        }
    }
}
