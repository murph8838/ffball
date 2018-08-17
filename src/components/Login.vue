<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-btn color="primary" @click="login">Login with Yahoo!</v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<script>
  export default {
    methods: {
      login: function () {
        const ClientOAuth2 = require('client-oauth2');
        const request = require('request');
 
        console.log('Creating yahooAuth object');
        const yahooAuth = new ClientOAuth2({
          clientId: 'dj0yJmk9M2xJVUZ0QUdCVGtBJmQ9WVdrOWNuVkRlVFY1TXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1kZQ--',
          authorizationUri: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: 'https://murph8838.github.io/footify'
        },
        {
          query: {
            response_type: "token"
          }
        });

        window.oauth2Callback = function (uri) {
          yahooAuth.token.getToken(uri)
            .then(function (user) {
              console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
        
              // Sign a request
              const signed = user.sign({
                method: 'get',
                url: 'https://fantasysports.yahooapis.com/fantasy/v2/league/nfl.l.633720/players;status=A;start=25;count=10'
              });

              console.log('signed rqst', signed);
              // Make a request to the yahoo API for the current user.
              // return request.get().then(function (res) {
              //   console.log(res) //=> { body: { ... }, status: 200, headers: { ... } }
              // })
            })
        }
        
        // Open the page in a new window, then redirect back to a page that calls our global `oauth2Callback` function.
        window.open(yahooAuth.token.getUri())

        console.log('I happened!');
      }
    }
  }


</script>