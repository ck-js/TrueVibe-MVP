// now that our quiz component is successfully running with answer and email submissions to our postgresql database.
// now need to work on the login and user authetnitcation feature and functionality.
// set up user management postgresql database with vue.
// be wary of local vs online auth registration.
// possibly set up vue routers to navigate between auth and account components on successful auth.
// ```after the weekend of fixing client side routing issues with Vue Spa & Github Pages rendering 404 page by setting dev and prod environment variables and also set rule to redirect 404 to truevibe.app which does display a white screen when running into this issue but its the workaround that works for now so that we dont get 404 page.
'' now we can work on the conditional rendering of the log out button in the App header when the user is logged in
// also need to change the base styling for anchor tets and when mouse hover of anchor elements.
//the forgot password flow will send verification email to registered accounts and not to unregistered ones.
// however when clicking on the verification link it says page could not be found as we have not set up updatePassword page and its route.
// set up UpdatePassword page
// trying to figure out the re-direct route for when a user clicks on the verify profile on their email account, need to note the differences between production and dev environments.
// hmm ok we've made progress and now when we click on the verification link from email it now shows /quiz route instead of < page could not find server error > however it sems its being redirected from github page 404 page not found to our /quiz route.
// go through documentation of current workflow issues and parse through one by one
// try hash mode isntead of web history
// try diverge our code to vscode / cursor and troubleshoot / debug our forgot password / update password flow






