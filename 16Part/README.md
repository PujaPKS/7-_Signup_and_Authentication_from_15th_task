(https://drive.google.com/drive/folders/1Lv791t952AppOB4yDSABLq-xd5RcVo3R)


Task details

Try Implementing login by yourself. It is quite similar to how signup was implemented.

Follow my steps and try doing it by yourself.

Instead of using signup api url use the login api url as mentioned here - https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
Everything remains the same in terms of the request
In the response, when you enter the wrong user credentials - show the user Authentication failed alert like the way you did in signup.
When you put the right credentials you get a idToken which is nothing but the JWT. Console log it in the browser and check.


If stuck for very long watch video 6 from the following link and  and understand how things work


One question:-

Once the user has successfully logged In and you get the token as a response. Where would you store the token.

Answer keeping the following things in mind

The token. would be used in all the api calls after logging in so we need to store it smartly, so that it could be used