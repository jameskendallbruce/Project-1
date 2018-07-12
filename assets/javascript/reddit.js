$('document').ready(function(){
        // any empty var to hold our subReddit result's name
        var subReddit = ""
        var searchTerm = localStorage.getItem("key");
        // ajax call to search for relevant subreddits
        $.ajax(
        
            "https://www.reddit.com/subreddits/search.json",
        
            // this syntax is a little foreign to me but it works
            { data: {
            
                q: searchTerm 
            
                }, success: function(responseData) {
            
                    if (responseData.data.children.length > 0) {
                        // this is where we'll plug in our feed search query.
                        subReddit = responseData.data.children[0].data.url;
                        // url for new ajax call with the subReddit inserted into it
                        var feedQuery = "https://www.reddit.com" + subReddit + "top.json"
                        // new ajax call to search for top posts in this specific subreddit
                        $.ajax({
                            url: feedQuery,
                            method: "GET"
                        }).then(function(response){
        
                            console.log(response)
                            // returns an array of top posts
                            var subR = response.data.children;
                            console.log(subR);
                            // for loop to pull the top 20 posts
                            for (i=0; i <= 20; i++) {
                                // variable the text
                                var title = subR[i].data.title
                                // variable for a link to the post
                                var link = "https://www.reddit.com/" + subR[i].data.permalink;

                                var newThread = ("<div class='redditThread uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom redditHeader'>" + title + "</h3></div></div></div><div class='uk-card-footer'><a href='" + link + "' target='_blank' class='uk-button uk-button-text redditLink'>Link and Comments</a></div></div>");

                                $("#reddit-content").append(newThread);

                            }
                        });
                    } 
        
                },
    
            }
        // end reddit-js script
        ); 
// end document ready function
});
