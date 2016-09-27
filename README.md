<h2>Cross-platform Single Page Applications using ASP.NET Core, Angular 2 and Typescript</h2>

<a href="http://wp.me/p3mRWu-11L" rel="attachment wp-att-3961" target="_blank"><img src="https://chsakell.files.wordpress.com/2016/05/aspcorerc2.png?w=700&amp;h=355" alt="aspnet5-agnular2-03" width="700" height="355" class="alignnone size-full wp-image-3961"></a>

<h3>Frameworks - Tools - Libraries</h3>
<ul>
<li>ASP.NET Core</li>
<li>ASP.NET MVC 6</li>
<li>Entity Framework 7</li>
<li>Automapper</li>
<li>Angular 2</li>
<li>Typescript</li>
<li>Bootstrap 3</li>
<li>Gulp</li>
<li>Bower</li>
</ul>

<h3>Installation instructions - Part 1 (Applied for Windows/Linux/MAC)</h3>
<ol>
<li>Install ASP.NET Core according to your development environment from <a href="https://www.microsoft.com/net/core" target="_blank">here</a>.</li>
<li>Install <strong>NPM</strong> by installing <a href="https://nodejs.org/en/" target="_blank">Node.js</a>.</li>
<li>Install Bower, Gulp, Typescript and Typescript Definition Manager globally by typing the following commands on the console/terminal:
<ul>
<li>npm install -g bower</li>
<li>npm install -g gulp</li>
<li>npm install -g typescript</li>
<li>npm install -g typings</li>
<li>npm install -g tsd</li>
</ul>
</li>

<h3>Installation instructions - Part 2 (Run application in Visual Studio 2015, only for Windows users)</h3>
<ol>
<li>Download and install Visual Studio 2015 from <a href="https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx" target="_blank">here</a>.</li>
<li>Open Visual Studio 2015 and install any update related to ASP.NET Core (check the notifications).</li>
<li>Download the source code and open the solution.</li>
<li>By the time you open the solution, VS 2015 will try to restore Nuget, NPM and Bower packages.</li>
<li>In case it fails to restore NPM and Bower packages, open a console and navigate at the src/PhotoGallery path where the <i>package.json</i> and <i>bower.json</i> files exist. Run the following commands:
<ul>
<li>npm install</li>
<li>typings install</li>
<li>bower install</li>
<li>gulp build-spa</li>
</ul>
</li>
<li>Open <strong>appsettings.json</strong> file and alter the database connection string to reflect your SQL Server environment.</li>
<li>Open a console and navigate to src/PhotoGallery where the project.json exists. Run the following commands to enable migrations and create the database:
<ol>
<li>dotnet ef migrations add initial</li>
<li>dotnet ef database update</li>
</ol>
</li>
<li>Build your application and run it. You can use <i>username:</i> <strong>chsakell</strong> and <i>password:</i> <strong>photogallery</strong> to sign in or register a new user.</li>
</ol>

<h3>Installation instructions - Part 2 (Run application in Visual Studio Code, recommended for Linux/MAC users)</h3>
<ol>
<li>Download and install Visual Studio Code from <a href="https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx" target="_blank">here</a>.</li>
<li>Install the csharp extension from <a href="https://code.visualstudio.com/Docs/languages/csharp" target="_blank">here</a></li>
<li>Download the source code and open the src/PhotoGallery folder in Visual Studio Code.</li>
<li>Open a console/terminal and navigate at the src/PhotoGallery path where the <i>package.json</i> and <i>bower.json</i> files exist. Run the following commands:
<ul>
<li>npm install</li>
<li>typings install</li>
<li>bower install</li>
<li>gulp build-spa</li>
</ul>
</li>
<li>Run the following command to restore Nuget Packages (dependencies)
<ul>
<li>dotnet restore</li>
</ul>
</li>
<li>Application uses SQL Server so in case you want to run the app in Linux or MAC simply set <b>"InMemoryProvider": true</b> in <i>appsettings.json</i> and skip to the last 3 steps to run the app.</li>
<li>Open <strong>appsettings.json</strong> file and alter the database connection string to reflect your SQL Server environment.</li>
<li>Open a console/terminal and navigate to src/PhotoGallery where the project.json exists. Run the following commands to enable migrations and create the database:
<ol>
<li>dotnet ef migrations add initial</li>
<li>dotnet ef database update</li>
</ol>
</li>
<li>Host your application using <strong>Kestrel</strong> by typing the following command while at src/PhotoGallery:
<ul>
<li>dotnet run</li>
</ul>
</li>
<li>Open a browser and navigate to http://localhost:5000/</li>
<li>You can use <i>username:</i> <strong>chsakell</strong> and <i>password:</i> <strong>photogallery</strong> to sign in or register a new user.</li>
</ol>

<h2>Donations</h2>
For being part of open source projects and documenting my work here and on <a href="https://chsakell.com">chsakell's blog</a> I really do not charge anything. I try to avoid any type of ads also.

If you think that any information you obtained here is worth of some money and are willing to pay for it, feel free to send any amount through paypal.

<table>
<tr><th>Paypal</th></tr>
<tbody>
<tr>
<td><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=chsakell%40gmail%2ecom&lc=US&item_name=Donation%20for%20chsakell%27s%20blog&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted" style="text-align:center;display:block">
<img src="https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_cc_147x47.png" alt="Buy me a beer" />
</a></td>
</tr>
</tbody>
</table>

<h3 style="font-weight:normal;">Follow chsakell's Blog</h3>
<table id="gradient-style" style="box-shadow:3px -2px 10px #1F394C;font-size:12px;margin:15px;width:290px;text-align:left;border-collapse:collapse;" summary="">
<thead>
<tr>
<th style="width:130px;font-size:13px;font-weight:bold;padding:8px;background:#1F1F1F repeat-x;border-top:2px solid #d3ddff;border-bottom:1px solid #fff;color:#E0E0E0;" align="center" scope="col">Facebook</th>
<th style="font-size:13px;font-weight:bold;padding:8px;background:#1F1F1F repeat-x;border-top:2px solid #d3ddff;border-bottom:1px solid #fff;color:#E0E0E0;" align="center" scope="col">Twitter</th>
</tr>
</thead>
<tfoot>
<tr>
<td colspan="4" style="text-align:center;">Microsoft Web Application Development</td>
</tr>
</tfoot>
<tbody>
<tr>
<td style="padding:8px;border-bottom:1px solid #fff;color:#FFA500;border-top:1px solid #fff;background:#1F394C repeat-x;">
<a href="https://www.facebook.com/chsakells.blog" target="_blank"><img src="https://chsakell.files.wordpress.com/2015/08/facebook.png?w=120&amp;h=120&amp;crop=1" alt="facebook" width="120" height="120" class="alignnone size-opti-archive wp-image-3578"></a>
</td>
<td style="padding:8px;border-bottom:1px solid #fff;color:#FFA500;border-top:1px solid #fff;background:#1F394C repeat-x;">
<a href="https://twitter.com/chsakellsBlog" target="_blank"><img src="https://chsakell.files.wordpress.com/2015/08/twitter-small.png?w=120&amp;h=120&amp;crop=1" alt="twitter-small" width="120" height="120" class="alignnone size-opti-archive wp-image-3583"></a>
</td>
</tr>
</tbody>
</table>
