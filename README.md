cleartripproject
================

A Project done for cleartrip.com

Read Me
===========

1.The Json data for each flight is {"dt":"17:25","pr":"10676.0","al":"9W","aln":"Jet Airways","ad":"25/12/2013","at":"19:40","afd":"9W362"} as used in the Clear Trip original website.

2.For Rendering the DOM, i am using template. and for usability Handlebar.js is being used.

4.Sorting is done in the same manner As in the clear trip site, but it is now restricted to just sorting based on the price category only. but it can be always extended to do sorting based on other fieldss as well.


5. Clicking filter link should toggle the hidden filter area and shown results area, and hitting filter flights will toggle back and re-render the list with the filtered list. All the filters given in the Wite is being implemented.

6. In filter section, the Airline Filter is implemented such that filters code is  capable of adding other filters with very less code change. 

7. Implemented MV* architecture as far as possible with the requirement at hand.

I am not using JQUERY for DOM manipulation as specified in the mail.
And also underscore.js is used for achieving the functionality.

code Structure
=============
Apart from loading the javascript file and the jsonobject containg the Flight details all other scripting is done in the javascript file:: cleartriphome.js

The VIEW  module part is concerned with all the the DOM manipulation code .
The QUERYBUILDER module part is concerned with building the query for the sorting and filting functionality. and it is  always easy to extend to accommodate new features.

Some Multibrowser code is used because jquery is not being used.

In general, Revealing Module pattern is used as the Coding style
