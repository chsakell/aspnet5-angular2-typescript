using System;

namespace PhotoGallery.ViewModels
{
    public class AlbumViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Thumbnail { get; set; }
        public DateTime DateCreated { get; set; }
        public int TotalPhotos { get; set; }
    }
}
