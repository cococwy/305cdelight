# DEMO URL

https://peakmitweb.herokuapp.com/

### Dummy Account for testing

```sh
username - coco
password - abc
```

# Credits

### Hosting

Website - https://www.heroku.com/

MongoDB - https://mlab.com

### Website Templates

https://startbootstrap.com/template-overviews/agency/

### Packages

Mongoose - http://mongoosejs.com

### Embed Youtube Video
https://www.youtube.com/watch?v=gP-hx9qPZiU

https://www.youtube.com/watch?v=tDTJo-9VfwM

https://www.youtube.com/watch?v=shtRXgefI9U

https://www.youtube.com/watch?v=jfkPj-2KkSM


### Google Map
```js
map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center: {lat: 22.4389204, lng: 114.0483697}
});

marker = new google.maps.Marker({
  map: map,
  draggable: true,
  animation: google.maps.Animation.DROP,
  position: {lat: 22.4389204, lng: 114.0483697}
});
```

### Facebook Login
```js
FB.init({
  appId      : appID,
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
});
href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpeakmitweb.herokuapp.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>


function login() {
    FB.login(function(response) {

    // handle the response
    console.log("Response goes here!", response);

      if (response.status === 'connected') {

        FB.api('/me', function(response) {
          response["type"] = "facebook";
          $.ajax({
            url: "/auth",
  					type: "POST",
  					data: response,
  					success: function (result) {
              if (result == "success"){
                localStorage.setItem("username", response.name);
                window.location.href = "/index";
              }
      			},
      			error: function(result){
            			console.log(result);
    				}
  				});

        });


      } else {
        console.log(response);
      }

    },{scope: 'public_profile,email'});
}
```


### Facebook Share
```html
<div class="fb-share-button mt-1" data-href="https://peakmitweb.herokuapp.com/" data-layout="button" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpeakmitweb.herokuapp.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
```

### Facebook Like
```html
<div class="fb-like" data-href="http://peakmitweb.herokuapp.com/" data-width="100px" data-layout="button" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
```

### Public APIs

https://s3-ap-southeast-1.amazonaws.com/historical-resource-archive/2018/05/16/http%253A%252F%252Fwww.ha.org.hk%252Fopendata%252Ffacility-hosp.json/0943

https://data.hawaii.gov/api/views/2dr7-mwnn/rows.json?accessType=DOWNLOAD

https://data.opendatasoft.com/explore/dataset/drug-arrests-in-the-us%40public/

https://data.opendatasoft.com/explore/dataset/dash-youth-risk-behavior-surveillance-system-yrbss-middle-school%40public/

https://data.opendatasoft.com/explore/dataset/nchs-drug-poisoning-mortality-by-county-united-states%40public/



# API Endpoints

### User Login
```sh
URI       https://peakmitweb.herokuapp.com/login
Method	  POST
Data	  {
          "username": "coco",
          "password": "abc"
}
Result	{
    "_id": "5b6559c772bbc300040f720d",
    "username": "coco",
    "password": "abc"
}
Error	{
    "login": "fail"
}
```

### User Registration
```sh
URI       https://peakmitweb.herokuapp.com/register
Method	  POST
Data	  {
    "username": "coco",
    "password": "abc"
}
Result	{
          "result": "success"
}
Error	{
          "result": "fail"
}
```
### User's Favourites List
```sh
URI       https://peakmitweb.herokuapp.com/readfavourlist
Method	  GET
Result	[
          {
            "_id": "5b655adb72bbc300040f720e",
            "id": "5b489ecefb6fc062bcfbd8b8",
            "img": "/img/drug/drug5.jpg",
            "date": "03 Feb, 2017",
            "title": "Solvents",
            "content": "When inhaled, solvents have a similar effect to alcohol. They make people feel uninhibited, euphoric and dizzy.",
            "username": "coco"
          }
]
Error	{
}
```
### Add to Favourites List
```sh
URI       https://peakmitweb.herokuapp.com/addfavourlist
Method	  POST
Data	  {
            "id":"5b489ecefb6fc062bcfbd8b8",
            "img":"/img/drug/drug5.jpg",
            "date":"03 Feb, 2017",
            "title": "Solvents",
            "content": "When inhaled, solvents have a similar effect to alcohol. They make people feel uninhibited, euphoric and dizzy.",
}
Result	{
    "result": "success"
}
Error	{
    "result": "fail"
}
```
### Remove from Favourites List
```sh
URI       https://peakmitweb.herokuapp.com/removefavourlist
Method	  POST
Data	  {
          "id": "5b655adb72bbc300040f720e"
}
Result	{
    "result": "success"
}
Error	{
    "result": "fail"
}
```
### Search a blog
```sh
URI       https://peakmitweb.herokuapp.com/searchblogs
Method	  POST
Data	  {
          "title": "Opioids"
}
Result	{
          "resultCount": 1,
          "results": [
            {
              "_id": "5b655adb72bbc300040f720e",
              "id": "5b489ecefb6fc062bcfbd8b8",
              "img": "/img/drug/drug5.jpg",
              "date": "03 Feb, 2017",
              "title": "Solvents",
              "content": "When inhaled, solvents have a similar effect to alcohol. They make people feel uninhibited, euphoric and dizzy.",
              "username": "coco"
            }            
}
Error	{
          "resultCount": 0
}
