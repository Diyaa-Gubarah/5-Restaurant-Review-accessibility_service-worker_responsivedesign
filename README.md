Restaurant Reviews App   Stage 1
----------------------------------------
## Overview
This my fourth project **solution** in my front end web developer nanodegree by [Udacity](https://www.udacity.com).

In this project I did this :
* Convert the provided site to use a **responsive design**.
* Implement **accessibility** features in the site HTML.
* Add a **ServiceWorker** script to cache requests to all of the site’s assets so that any page that has been visited by a user will be accessible when the user is offline.

## Project Overview: Stage 1

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### Specification

You have been provided the code for a restaurant reviews website. The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality.

### What to use?

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer.

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. With your server running, visit the site: `http://localhost:8000`, and look around for your best restaurant 👌😎.

## Reference
* [Media Queries for Standard Devices](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/).
* [Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/).
* [Service Workers: An Introduction](https://developers.google.com/web/fundamentals/primers/service-workers/).
* [Caching strategies](https://serviceworke.rs/strategy-cache-only.html).
