# dragula-plain-js
This is very simplistic way to implement drag and drop feature in plain js anywhere or everwhere :)

Hi, 

It is the minimal way to do things like drag and drop without any plugins in everywhere because it's written purely in js 'no additional
css nothing. You could attach multiple files to it.

How to use this ->

Step 1) I am having this in demo.html 
  "<div name="somename" class="dropzone" style="width: 200px; height: 200px"></div>"
  
  Actually, where we have create drag - drop div we have to just assign the class = "dropzone" to it.
  
Step 2) Assign name to it so that when we get the value from the module (dropmodule => which provides all the values of files) it preserves
in the dictionary as { name - files } pairs. So just assign name according to your convention.

Step 3) We could provide height and width to the dropzone otherwise it will accomodate the whole width.

Step 4) Final Step - what should be the conclusion of the story - files, right?

~~~ Beware use async attribute in script file so that after DOM loaded script run afterthat ~~~
for-ex <script async src="dragdrop.js"></script>

how could we get it, i have made a module dropmodule which is global variable in that we have files variable here all files we will get.

Just like this, dropmodule.files    enjoy :)
