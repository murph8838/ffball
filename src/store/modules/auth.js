const auth = {
    namespaced: true,
    state: {
        accessToken: '',
        oauthRequested: false,
        oauthSuccessful: false,
        oauthError: ''
    },
    getters: {
        isAuthenticated: (state, getters) => {
            console.log('isAuthenticated getter triggered');

            // Add an expiration check to this
            return state.accessToken ? true : false;
        }
    },
    actions: {
        oauthUserRequest ({commit}) {
            console.log('oauthUserRequest action triggered');
            // triggered by login click
            // set requested to true
            // trigger oauth api call to yahoo (routes user away)
            // set timeout timer --> Maybe make this a root action?
            //   - if timeout triggers, dispatch oauthUserTimeout
        },

        oauthUserTimeout ({commit}) {
            console.log('oauthUserTimeout action triggered');

            // triggered by oauthUserRequest (or root action?)
            // set authError to 'timeout'
        },

        oauthUserResponse ({commit}, uri) {
            // 8/20 - started trying to move this into an action, holding off until i figure out
            // how to get it work in plain javascript first. See Login.vue.
            console.log('oauthUserResponse action triggered');

            const yahooAuth = new ClientOAuth2({
                clientId: 'dj0yJmk9M2xJVUZ0QUdCVGtBJmQ9WVdrOWNuVkRlVFY1TXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1kZQ--',
                authorizationUri: 'https://api.login.yahoo.com/oauth2/request_auth',
                redirectUri: 'https://murph8838.github.io/footify/'
                },
                {
                query: {
                    response_type: "token"
                }
            });
            // this callback should just be defined and exported in its own file somewhere...
            // leaving it here for now...
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
    },
    mutations: {
        setAccessToken(state, accessToken) {
            console.log('setAccessToken mutation triggered');

            state.accessToken = accessToken;
        },
        setOauthRequested(state, oauthRequested) {
            console.log('setOauthRequested mutation triggered');

            state.oauthRequested = oauthRequested;
        },
        setOauthSuccessful(state, oauthSuccessful) {
            console.log('setOauthSuccessful mutation triggered');

            state.oauthSuccessful = oauthSuccessful;
        },
        setOauthError(state, oauthError) {
            console.log('setOauthError mutation triggered');

            state.oauthError = oauthError;
        }
    }
  }

  export default auth;