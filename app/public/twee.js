window.addEventListener("load",function(){
    let myHeaders = new Headers();
    let myInit = {
        method:"GET",
        headers:myHeaders,
        mode:'cors'
        };

    fetch("/ajax",myInit)
    .then(response => response.json())
    .then(data => {
        console.log(data.tweets.length);
        for(var i =0;i < data.tweets.length;i++){
            console.log(data.tweets );
            appendNewTweet(data.tweets[i]);
        }
    });


    function appendNewTweet(tweet){
        let newTweet = `
        <div class="t_container">
            <div class="tweet_time">${new Date(tweet.time).toLocaleDateString()}</div>
            <div class="tweet_body">${tweet.text}</div>
        </div>`;
        // append new tweet to the target container 
        document.querySelector("#tweets_target_js").innerHTML+=newTweet;
    }

    // ADD NEW TWEET
    let tweeNow = document.querySelector('#tweet');
    tweeNow.addEventListener('click', postTweet);

    function postTweet(){
        let input = document.getElementById('new_tweet_js');
        let inputValue = input.value;
        fetch("/ajax",
        {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tweet:inputValue})
        }
    )
        .then(response => response.json())
        .then(data => {
            appendNewTweet(data);
            input.value = "";
        })
        ;
    }
});