(https://drive.google.com/drive/folders/1TzG9NdFAFSES9N2SZsIIrcmuit4_K9ON)


Task details: 

There is a big security problem with your application



Watch video 11 from the following link to understand the security issue and answer the following

What is the problem that is there?
How does the trainer solve the problem? What are the two solutions he proposes and which one do you think would be bettter? Explain the reason for choosing.




Deliverable [This is very simple , DIY]

Currently one problem with storing the token in the context is that whenever we refresh the page, we have login again. This is because the value of token gets garbage collected when the page reload.
We need to store the token in some place where we would not loose it even after refreshing [hint - LocalStorage]
Store the token in localStorage when the user gets successfully logged In.
When the user logs Out, clear the token from the local Storage
When the user refreshes the page , load the token from the local storage and use it so that the user doesn't have to login after every refresh.


First try by yourself .I have explained everything that is needed.This is very simple

If stuck for long watch video 12 from the above link.