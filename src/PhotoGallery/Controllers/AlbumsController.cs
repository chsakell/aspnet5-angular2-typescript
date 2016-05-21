using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.Entities;
using PhotoGallery.ViewModels;
using AutoMapper;
using PhotoGallery.Infrastructure.Repositories;
using PhotoGallery.Infrastructure.Core;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PhotoGallery.Controllers
{
    [Route("api/[controller]")]
    public class AlbumsController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        IAlbumRepository _albumRepository;
        ILoggingRepository _loggingRepository;
        public AlbumsController(IAuthorizationService authorizationService,
                                IAlbumRepository albumRepository,
                                ILoggingRepository loggingRepository)
        {
            _authorizationService = authorizationService;
            _albumRepository = albumRepository;
            _loggingRepository = loggingRepository;
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet("{page:int=0}/{pageSize=12}")]
        public async Task<IActionResult> Get(int? page, int? pageSize)
        {
            PaginationSet<AlbumViewModel> pagedSet = new PaginationSet<AlbumViewModel>();

            try
            {
                if (await _authorizationService.AuthorizeAsync(User, "AdminOnly"))
                {
                    int currentPage = page.Value;
                    int currentPageSize = pageSize.Value;

                    List<Album> _albums = null;
                    int _totalAlbums = new int();


                    _albums = _albumRepository
                        .AllIncluding(a => a.Photos)
                        .OrderBy(a => a.Id)
                        .Skip(currentPage * currentPageSize)
                        .Take(currentPageSize)
                        .ToList();

                    _totalAlbums = _albumRepository.GetAll().Count();

                    IEnumerable<AlbumViewModel> _albumsVM = Mapper.Map<IEnumerable<Album>, IEnumerable<AlbumViewModel>>(_albums);

                    pagedSet = new PaginationSet<AlbumViewModel>()
                    {
                        Page = currentPage,
                        TotalCount = _totalAlbums,
                        TotalPages = (int)Math.Ceiling((decimal)_totalAlbums / currentPageSize),
                        Items = _albumsVM
                    };
                }
                else
                {
                    CodeResultStatus _codeResult = new CodeResultStatus(401);
                    return new ObjectResult(_codeResult);
                }
            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return new ObjectResult(pagedSet);
        }


        [Authorize(Policy = "AdminOnly")]
        [HttpGet("{id:int}/photos/{page:int=0}/{pageSize=12}")]
        public PaginationSet<PhotoViewModel> Get(int id, int? page, int? pageSize)
        {
            PaginationSet<PhotoViewModel> pagedSet = null;

            try
            {
                int currentPage = page.Value;
                int currentPageSize = pageSize.Value;

                List<Photo> _photos = null;
                int _totalPhotos = new int();

                Album _album = _albumRepository.GetSingle(a => a.Id == id, a => a.Photos);

                _photos = _album
                            .Photos
                            .OrderBy(p => p.Id)
                            .Skip(currentPage * currentPageSize)
                            .Take(currentPageSize)
                            .ToList();

                _totalPhotos = _album.Photos.Count();

                IEnumerable<PhotoViewModel> _photosVM = Mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoViewModel>>(_photos);

                pagedSet = new PaginationSet<PhotoViewModel>()
                {
                    Page = currentPage,
                    TotalCount = _totalPhotos,
                    TotalPages = (int)Math.Ceiling((decimal)_totalPhotos / currentPageSize),
                    Items = _photosVM
                };
            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return pagedSet;
        }
    }
}
