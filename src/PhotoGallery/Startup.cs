using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.Extensions.Configuration;
using PhotoGallery.Infrastructure;
using Microsoft.Data.Entity;
using PhotoGallery.Infrastructure.Repositories;
using PhotoGallery.Infrastructure.Services;
using PhotoGallery.Infrastructure.Mappings;
using PhotoGallery.Infrastructure.Core;
using System.Security.Claims;
using Microsoft.AspNet.StaticFiles;
using Microsoft.AspNet.FileProviders;
using System.IO;

namespace PhotoGallery
{
    public class Startup
    {
        private static string _applicationPath = string.Empty;
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            _applicationPath = appEnv.ApplicationBasePath;
            // Setup configuration sources.

            var builder = new ConfigurationBuilder()
                .SetBasePath(appEnv.ApplicationBasePath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // This reads the configuration keys from the secret store.
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Entity Framework services to the services container.
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<PhotoGalleryContext>(options =>
                    options.UseSqlServer(Configuration["Data:PhotoGalleryConnection:ConnectionString"]));

            // Repositories
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IAlbumRepository, AlbumRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<ILoggingRepository, LoggingRepository>();

            // Services
            services.AddScoped<IMembershipService, MembershipService>();
            services.AddScoped<IEncryptionService, EncryptionService>();

            services.AddAuthentication();

            // Polices
            services.AddAuthorization(options =>
            {
                // inline policies
                options.AddPolicy("AdminOnly", policy =>
                {
                    policy.RequireClaim(ClaimTypes.Role, "Admin");
                });

            });

            // Add MVC services to the services container.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            // Add the platform handler to the request pipeline.
            app.UseIISPlatformHandler();

            // Add static files to the request pipeline.
            //app.UseStaticFiles();

            // this will serve up wwwroot
            app.UseFileServer();

            // this will serve up node_modules
            var provider = new PhysicalFileProvider(
                Path.Combine(_applicationPath, "node_modules")
            );
            var _fileServerOptions = new FileServerOptions();
            _fileServerOptions.RequestPath = "/node_modules";
            _fileServerOptions.StaticFileOptions.FileProvider = provider;
            _fileServerOptions.EnableDirectoryBrowsing = true;
            app.UseFileServer(_fileServerOptions);

            AutoMapperConfiguration.Configure();

            app.UseCookieAuthentication(options =>
            {
                options.AutomaticAuthenticate = true;
                options.AutomaticChallenge = false;
            });

            // Custom authentication middleware
            //app.UseMiddleware<AuthMiddleware>();
            // Add MVC to the request pipeline.
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                // Uncomment the following line to add a route for porting Web API 2 controllers.
                //routes.MapWebApiRoute("DefaultApi", "api/{controller}/{id?}");
            });

            DbInitializer.Initialize(app.ApplicationServices, _applicationPath);
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
