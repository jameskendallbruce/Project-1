$(document).ready(function() {

    var proxyUrl = 'https://vast-brook-22866.herokuapp.com/'
    var searchTerm = localStorage.getItem("key");
    var game = searchTerm;
    var idList = [];
    var targetUrl = "https://api-endpoint.igdb.com/games/?search=" + game + "&fields=name,games,url&limit=5"; //ADD
    var id = 0;
    var similarList = [];
    var similarImgs = [];
    var similarNames = [];
    var similarUrl = [];
    var src = "";
    var divId = "";
 
    async function main() {
      let response = await fetch(proxyUrl + targetUrl, {
        method: 'GET',
        headers: {
          'user-key': 'cae8afa6d497d92c7c6c43294aae73bc',
          'Accept': 'application/json'
        }
      });
 
      response = await response.json();
 
      idList = response[0].games;
 
 
      for (let i = 0; i < idList.length; i++) {
        id = idList[i];
        let targetUrl2 = "https://api-endpoint.igdb.com/games/" + id + "?fields=name,cover,url";
 
        let response2 = await fetch(proxyUrl + targetUrl2, {
          method: 'GET',
          headers: {
            'user-key': 'cae8afa6d497d92c7c6c43294aae73bc',
            'Accept': 'application/json'
          }
        });
 
        response2 = await response2.json();
        console.log(response2);
 
        similarNames.push(response2[0].name);
        similarUrl.push(response2[0].url);
        localStorage.setItem("recommended", similarNames);
        similarImgs.push(response2[0].cover.cloudinary_id);
 
      }
 
      for (let j = 0; j < similarImgs.length; j++) {
        let src = "https://images.igdb.com/igdb/image/upload/t_cover_small_2x/" + similarImgs[j] + ".jpg";
        divId = "recommendedGame" + j;
        $(".recommended").append($("<div id=" + divId + " class='recommendedGame'></div>"));
        let url = similarUrl[j];
        $('#' + divId).append($("<a href=" + url + " target='_blank'><img src='" + src + "'></a>"));
    
      }
    }
 
    main();
 
 });

 
