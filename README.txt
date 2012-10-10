This is the code of the "MeieRaha" project.
-------------------------------------------
Directory organization:

 * data/
   Datafiles used directly or indirectly in the project.

 * src/web
   The currently deployed website.
   The project consists of php/inc files developed in this directory and 
   js/css files that are developed in the haxe/ directory and copied to src/web on deployment.

 * haxe/
   The main code of the project (contains all the bubble logic, etc).
   It uses the following development toolkit:
    * Code is written in Haxe (http://haxe.org),
        (A FlashDevelop project is at haxe/MeieRaha.hxproj)
    * It is then compiled to javascript 
        (Resulting file: haxe/html/js/MeieRaha.js)
    * It is then compiled using Google Closure compiler (http://code.google.com/closure/compiler/)
      together with some necessary libraries (jquery-qtip, raphael) into a single bundle
        (Resulting file: haxe/html/js/MeieRaha.compiled.js) [this is optional, though]
    * Stylesheets are developed using Compass (http://compass-style.org)
      Source files are at haxe/html/static/sass, they are compiled via the compass command-line tool
      to haxe/html/static/css
    * Finally, the generated .js and .css files are included in the appropriate HTML page.
  
---------------------------------------------------------
DEVELOPER'S MANUAL

To work on the project, do the following:
 * Checkout the source code
 * Install Compass CSS framework (http://compass-style.org/)
 * Open command-line window at haxe/html/static
 * Run 
   $ compass compile
   $ compass watch
   (and leave it running)
 * Install FlashDevelop, Haxe and Google Closure Compiler for Javascript
 * Open haxe/MeieRaha.hxproj in FlashDevelop.
 * Check the project settings, namely the "post-build command". Make sure it uses
   correct paths to the closure compiler.
 * Select "Release" mode and push "Build". 
 * If everything goes well, the built website will be opened.

Notes:
 * The deployed version is NOT the same as the index.html used during Haxe development
   The production site is made of php files stored in src/web directory.
 * Take a look at the Project->Properties->Build tab in FlashDevelop. There you will
   see whether a closure compiler is invoked after haxe or not.
   (I use "echo" to "comment out" the proper invocation).
   If the closure compiler IS invoked, the final file is MeieRaha.compiled.js,
   and the index.html for debugging must only include this file, and does not need to include
   jquery.qtip, ..., ComparisonBubbles scripts.
   If the closure compiler IS NOT invoked, the final file is MeieRaha.js, and it should be included
   together with jquery.qtip, ..., ComparisonBubbles. Take a look at index.html to make sure things work fine.
 * After you change the scss files, compass updates files in the haxe/html/static/css directory. You have to
   manually copy them to the src/web/static/css directory. Same goes for images, which have to be maintained both
   in the haxe/html/static/img (for convenient Haxe development) and in the src/web/static/img (for deployment).
 * Similarly, the compiled MeieRaha.compiled.js has to be manually deployed to the src/web/static/js directory.
 * Finally, the story with the data files is especially complicated.
   * The most up-to-date database is src/web/data/all_records.txt.
   * This file is processed using make_files.py to create a bunch of csv and js files.
   * Note that *rules.js files are not generated from all_records. Don't delete it by mistake.

Yes, all this lends to suggest that an automation of the deployment procedure is necessary.
Yes, most of it was done during two days of the Garage48 hackathon (+ minor cleaning up later).
Yes, nowadays I'd probably go with d3.js for implementing the bubbles.

---------------------------------------------------------
All code and documentation of the project is protected by the
Creative Commons conditions -  CC Attribution-NonCommercial-ShareAlike 
(http://creativecommons.org/licenses/by-nc-sa/3.0/)

Original version:
With all the technical questions contact Konstantin Tretyakov.
Design-related questions and requests should go to Tanel Karp.

Modified version has been prepared by Alex Urbanowicz 
(aurbanowicz at centrumcyfrowe.pl) for zaprojektuj.OtwartyBudzet.pl project.
