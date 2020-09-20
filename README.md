# Student Details Portal

A simple web app built using HTML5, CSS3, Bootstrap and ES6(Js) for basic structure and functionality of the page and also utilizing Session Web Storage to store the data in the browser till the time the user is using the portal. The `ES6` is being converted into a backwards compatible version of JavaScript for current and older browsers or environments using babeljs.

Open and view the Project using the `.zip` file provided or at my [Github Repository](https://github.com/madhur-taneja/Student-Details-Portal).

The project is also hosted [GitHub](https://madhur-taneja.github.io/Student-Details-Portal/).

## Table of Contents
- [Getting Started](#getting-started)
	- [Tools Required](#tools-required)
	- [Installation](#installation)
- [Development](#development)
- [Running the App](#running-the-app)
- [References](#references)

## Getting Started

This project was built from scratch.

### Tools Required

You would require the following tools to develop and run the project:

* [node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* A text-editor of your choice.

### Installation

Start by setting up the project environment. `cd` into the project's root folder and run the following command to install the packages mentioned in `package.json`:

```
  npm install
```

## Development

* Create a project folder and open terminal
* Run the following command to initialize a node project

  ```
    npm init
  ```

* Run the following command to add babeljs

  ```
    npm i --save-dev babel-cli babel-core babel-preset-es2015
  ```

* Add a script to the `package.json` file as follows:

  ```
    "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"build": "babel src/ES6/* -d js"
    }
  ```
  
* Create `.babelrc` file with the following code:

  ```
	{ 
		"presets": ["es2015"] 
	}
  ```

* Create `index.html` with basic markup 
* Create `src` folder containing the following:
  * `img` folder with all the required images 
  * `css` folder containing `styles.css` with the required styling 
  * `ES6` folder containing `js/main.js` with the following `ECMAScript 6` js functions:
    * Function for form submit
	* `newStudent`
	* `deleteStudent`
	* `editStudent`
	* `saveEditing`
	* `cancelEditing`
	* `deleteAll`
  
  Link all the resources to `index.html` <br>
  For details on how everything has been implemented, refer the source code.

## Running the App

* Open terminal in the root directory and run the following command:

  ```
    npm run build
  ```
  
  This will convert the `ES6/main.js` file's code and create a `js/main.js` file
* Open `index.html` file in the browser of your choice.

## References

* Babel [Docs](https://babeljs.io/docs/en/)
* Getting Started with Babel by [Steve Griffith](https://www.youtube.com/watch?v=ahh65GQz74g)
