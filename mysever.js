var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const PORT = process.env.PORT || 5000;

(function()
 {

	var fs, http, qs, server, url, request;
	http = require('http');
  https = require('https');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
  request = require('request');


  var dbUrl, dbAuth = "";
	var loginStatus = false, loginUser = "";
  var credentials = {};

  if (process.env.NODE_ENV == "development"){
    var privateKey  = fs.readFileSync('/etc/apache2/ssl/sslnodejs/private.pem', 'utf8');
    var certificate = fs.readFileSync('/etc/apache2/ssl/sslnodejs/file.crt', 'utf8');
    credentials = {key: privateKey, cert: certificate};

    // local db
    dbUrl = 'mongodb://localhost:27017/';
    dbAuth = null;

    // run sever
    server = https.createServer(credentials, function(req, res) {receivSeverData(req, res) });
  }else{

    // ext. db
    dbUrl = 'mongodb://coco:qewr1234@ds131971.mlab.com:31971/mydb';
    dbAuth = {'auth': {'user': 'coco','password': 'qwer1234'}};

    // run sever
    server = http.createServer(function(req, res) {receivSeverData(req, res) });
  }

  function receivSeverData(req, res){

  		var action, form, formData, msg, publicPath, urlData, stringMsg;
  		urlData = url.parse(req.url, true);
  		action = urlData.pathname;
  		publicPath = __dirname + "\\public\\";


      if (action === "/auth")
  		{
  			console.log("auth");
  			if (req.method === "POST")
  			{

  		    console.log("action = post");
  				formData = '';
  				msg = '';
  				return req.on('data', function(data)
  				{
            formData += data;
  					return req.on('end', function()
  					{
                data = qs.parse(formData);

                MongoClient.connect(dbUrl, dbAuth, function(err, db)
    						{
                  loginStatus = true;
                  loginUser = data.name;

    							var finalcount;
    							if (err) throw err;
    							var dbo = db.db('mydb');
                  console.log(data);
    							dbo.collection('customers').count({"id":data.id}, function(err, count)
    							{
    								finalcount = count;
    								if(finalcount > 0)
    								{
    									if(err) throw err;
    									console.log('user exist');
    									db.close();
    									return res.end('success');
    								}
    								else
    								{
    									dbo.collection('customers').insertOne(data, function(err, custres)
    									{
    										if (err) throw err;

                        console.log('1 document inserted ' + loginUser);

    										db.close();
    										return res.end('success');
    									});
    								}
    							});
    						});

  					});

  				});

  			}
  		}

  		if (action === "/register")
  		{
  			console.log("register");
  			if (req.method === "POST")
  			{
  		    console.log("action = post");
  				formData = '';
  				msg = '';
  				return req.on('data', function(data)
  				{
  					formData += data;

  					console.log("form data="+ formData);
  					return req.on('end', function()
  					{
  						var user;
  						user = qs.parse(formData);

  						//user.id = "0";
  						/*msg = JSON.stringify(user);
  						stringMsg = JSON.parse(msg);

  						res.writeHead(200,
  						{
  							"Content-Type": "application/json",
  							"Content-Length": msg.length
  						});*/
  						MongoClient.connect(dbUrl, dbAuth, function(err, db)
  						{
  							var finalcount;
  							if (err) throw err;
  							var dbo = db.db('mydb');
  							dbo.collection('customers').count({'username':user.username}, function(err, count)
  							{
  								finalcount = count;
  								if(finalcount > 0)
  								{
  									if(err) throw err;
  									console.log('user exist');
  									db.close();
  									return res.end('fail');
  								}
  								else
  								{
  									dbo.collection('customers').insertOne(user, function(err, custres)
  									{
  										if (err) throw err;

                      loginStatus = true;
    									loginUser = user.username;
                      console.log('1 document inserted ' + loginUser);

  										db.close();
  										return res.end('success');
  									});
  								}
  							});
  						});
  					});
  				});

  			}
  			else
  			{

  				form = "register.html";
  				return fs.readFile(form, function(err, contents)
  				{
  					if (err !== true)
  					{
  						res.writeHead(200,
  						{
  							"Content-Type": "text/html"
  						});
  						return res.end(contents);
  					}
  					else
  					{
  						res.writeHead(500);
  						return res.end;
  					}
  				});
  			}
  		}

      else if (action === "/login")
  		{
  			console.log("login");
  			if (req.method === "POST")
  			{

          console.log("action = post");
  				formData = '';
  				msg = '';
  				return req.on('data', function(data)
  				{
  					formData += data;

  					console.log("form data="+ formData);
  					return req.on('end', function()
  					{
  						var user;
  						user = qs.parse(formData);
  						/*msg = JSON.stringify(user);
  						stringMsg = JSON.parse(msg);

  						res.writeHead(200,
  						{
  							"Content-Type": "application/json",
  							"Content-Length": msg.length
  						});*/

  						MongoClient.connect(dbUrl, dbAuth, function(err, db)
  						{
  							var finalcount;
  							if (err) throw err;
  							var dbo = db.db("mydb");
  							dbo.collection("customers").count(user, function(err, count)
  							{

  								finalcount = count;
  								if(err) throw err;

                  if(finalcount > 0)
  								{
  									loginStatus = true;
  									loginUser = user.username;
  									console.log("user exist, user is: " + loginUser);
  									db.close();
  									return res.end("success");
  								}
  								else
  								{
  									db.close();
  									console.log("user or pw not match");
  									return res.end("fail");
  								}
  							});
  						});
  					});
  				});

  			}
  			else
  			{
  				//form = publicPath + "ajaxSignupForm.html";
  				form = "login.html";
  				return fs.readFile(form, function(err, contents)
  				{
  					if (err !== true)
  					{
  						res.writeHead(200,
  						{
  							"Content-Type": "text/html"
  						});
  						return res.end(contents);
  					}
  					else
  					{
  						res.writeHead(500);
  						return res.end;
  					}
  				});
  			}



  		}

      else if (action === "/removefavourlist")
  		{
  			if (req.method === "POST")
  			{
  				formData = '';
  				msg = '';
  				return req.on('data', function(data)
  				{
  					formData += data;
            return req.on('end', function()
  					{
              fav = qs.parse(formData);

  						MongoClient.connect(dbUrl, dbAuth, function(err, db)
  						{
  							if (err) throw err;
  							var dbo = db.db("mydb");

                dbo.collection("favourlist").remove({"_id": ObjectId(fav.id)}, function(err, favres)
                {
                  if (err) throw err;
                  // console.log(favres);
                  db.close();
                  return res.end("success");
                });

  						});

  					});
  				});

  			}
  		}

      else if (action === "/addfavourlist")
  		{
  			if (req.method === "POST")
  			{
  				formData = '';
  				msg = '';
  				return req.on('data', function(data)
  				{
  					formData += data;
            return req.on('end', function()
  					{
              fav = qs.parse(formData);
              fav['username'] = loginUser;

              // console.log(fav);

  						MongoClient.connect(dbUrl, dbAuth, function(err, db)
  						{
  							var finalcount;
  							if (err) throw err;
  							var dbo = db.db("mydb");

  							dbo.collection("favourlist").count(fav, function(err, count)
  							{
  								finalcount = count;
  								if(finalcount > 0)
  								{
  									if(err) throw err;
  									db.close();
                    console.log("favour existed");
  									return res.end("existed");
  								}
  								else
  								{
  									dbo.collection("favourlist").insertOne(fav, function(err, favres)
  									{
  										if (err) throw err;
  										console.log("1 favour inserted");
  										db.close();
  										return res.end("success");
  									});
  								}
  							});
  						});

  					});
  				});

  			}
  		}

  		else if (action === "/readfavourlist")
  		{
        console.log('loginStatus ' + loginStatus);
        console.log('loginUser ' + loginUser);

  			if(!loginStatus)
  			{
  				console.log("no logged in user found");
  			}
  			else
  			{
  				console.log("read favour");
  				MongoClient.connect(dbUrl, dbAuth, function(err, db)
  				{
  					var finalcount;
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;

  					//dbo.collection("favourlist").find({"user" : loginUser}, {"_id" : 0, "command" : 1, "texttitle" : 1}).toArray(function(err, result)
            dbo.collection("favourlist").find({"username" : loginUser}).toArray(function(err, favorites)
  					{
      				if (err) throw err;

              db.close();
              var resultReturn = JSON.stringify(favorites);
              return res.end(resultReturn);
  					});

  				});
  			}
  		}

      else if (action === "/favourlist")
      {
        console.log('loginStatus ' + loginStatus);
        console.log('loginUser ' + loginUser);

        if(!loginStatus)
        {
          sendFileContent(res, "login.html", "text/html");
        }else{
          sendFileContent(res, "favourlist.html", "text/html");
        }

      }

      else if (action === "/searchblogs")
  		{
  			console.log("search blogs");
  			if (req.method === "POST")
  			{

  				formData = '';
  				msg = '';
  				return req.on('data', function(data)
  				{
  					formData += data;
  					return req.on('end', function()
  					{
  						data = qs.parse(formData);
              console.log(data.title);
  						MongoClient.connect(dbUrl, dbAuth, function(err, db)
  						{
  							var finalcount;
  							if (err) throw err;
  							var dbo = db.db("mydb");

                // dbo.collection("blog").find({"title": data.title}).toArray(function(err, blog)
                var reg = new RegExp(data.title);
                dbo.collection("blog").find({"title": reg}).toArray(function(err, blog)
      					{
          				if (err) throw err;

                  db.close();
                  var resultReturn = JSON.stringify(blog);
                  return res.end(resultReturn);
      					});

  						});

  					});
  				});

  			}
  			else
  			{
  				//form = publicPath + "ajaxSignupForm.html";
  				form = "login.html";
  				return fs.readFile(form, function(err, contents)
  				{
  					if (err !== true)
  					{
  						res.writeHead(200,
  						{
  							"Content-Type": "text/html"
  						});
  						return res.end(contents);
  					}
  					else
  					{
  						res.writeHead(500);
  						return res.end;
  					}
  				});
  			}



  		}

      else if (action === "/readblogs")
  		{
  			if(!loginStatus)
  			{
  				console.log("no logged in user found");
  			}
  			else
  			{
  				console.log("read blog");
  				MongoClient.connect(dbUrl, dbAuth, function(err, db)
  				{
  					var finalcount;
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;
            var data = {};


            if (urlData.query.id != undefined){
              data = {"_id" : ObjectId(urlData.query.id)};
            }

            dbo.collection("blog").find(data).toArray(function(err, result)
  					{
      				if (err) throw err;
      				db.close();
              //console.log(result);
  						var resultReturn = JSON.stringify(result);
              return res.end(resultReturn);
  					});

  				});
  			}
  		}

      else if (action === "/blog")
      {
        console.log('loginStatus ' + loginStatus);
        console.log('loginUser ' + loginUser);

        if(!loginStatus)
        {
          sendFileContent(res, "login.html", "text/html");
        }else{
          sendFileContent(res, "blog.html", "text/html");
        }

      }

      else if (action === "/blogdetail")
      {
        if(!loginStatus)
        {
          sendFileContent(res, "login.html", "text/html");
        }else{
          sendFileContent(res, "blog-detail.html", "text/html");
        }
      }

      else if (action === "/game")
      {
        sendFileContent(res, "game.html", "text/html");
      }

      else if (action === "/shop")
      {
        sendFileContent(res, "shop.html", "text/html");
      }

      else if (action === "/research")
      {
        console.log('loginStatus ' + loginStatus);
        console.log('loginUser ' + loginUser);

        if(!loginStatus)
        {
          sendFileContent(res, "login.html", "text/html");
        }else{
          sendFileContent(res, "research.html", "text/html");
        }

      }

      else if (action === "/apiinform")
      {
        if (req.method === "POST")
  			{
  				formData = '';
  				msg = '';
  				return req.on('data', function(data)
  				{
  					formData += data;
            return req.on('end', function()
  					{
              postdata = qs.parse(formData);


              var options = {};

              options['url'] = postdata.source;


              var data = request(options, function(error, response, body){
                return res.end(body);
              });

  					});
  				});

  			}
      }

  		else
  		{
        //handle redirect
  			if(req.url === "/index" || req.url === "/")
  			{
          console.log('loginStatus ' + loginStatus);
          console.log('loginUser ' + loginUser);
          if(!loginStatus)
    			{
    				sendFileContent(res, "login.html", "text/html");
    			}else{
            sendFileContent(res, "index.html", "text/html");
          }

  			}
  			else if (req.url === "/login")
  			{
  				sendFileContent(res, "login.html", "text/html");
  			}
  			else if (req.url === "/register")
  			{
  				sendFileContent(res, "register.html", "text/html");
  			}
        else if (req.url === "/logout")
  			{
          loginStatus = false;
          loginUser = "";
  				sendFileContent(res, "login.html", "text/html");
  			}
  			else if(/^\/[a-zA-Z0-9-._\/]*.js$/.test(req.url.toString()))
  			{
  				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
  			}
  			else if(/^\/[a-zA-Z0-9-._\/]*.css$/.test(req.url.toString()))
  			{
  				sendFileContent(res, req.url.toString().substring(1), "text/css");
  			}
  			else if(/^\/[a-zA-Z0-9-._\/]*.jpg$/.test(req.url.toString()))
  			{
  				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
  			}
        else if(/^\/[a-zA-Z0-9-._\/]*.png$/.test(req.url.toString()))
  			{
  				sendFileContent(res, req.url.toString().substring(1), "image/png");
  			}
        else if(/^\/[a-zA-Z0-9-._\/]*.json/.test(req.url.toString()))
  			{
  				sendFileContent(res, req.url.toString().substring(1), "application/json");
  			}
  			else
  			{
  				console.log("Requested URL is: " + req.url);
  				res.end();
  			}

  		}
  }

	server.listen(PORT);

	console.log("Server is running Atime is" + new Date());


	function sendFileContent(response, fileName, contentType)
	{
		fs.readFile(fileName, function(err, data)
		{
			if(err)
			{
				response.writeHead(404);
				response.write("Not Found!");
			}
			else
			{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);
