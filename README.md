# Advent of Code Template

Advent of Code Template using Node JS for Current Year.

## Setup

If using the Advent of Code Template repo; click [**`Use this template`**](https://github.com/johnbeech/advent-of-code-nodejs-template/generate) and set a new repository name.

Clone this repo, then run `npm install` to install dependencies.

If this a brand new repository, run: `node setup` to configure it for Current Year and check in the changes.

## Running

To run a solution by day, use:
```
npm start day1
````

## New solutions

To create a new solution, run:

```
npm run create day1
```

This will not overwrite existing solutions; but it will copy the template, and then try to download that day's puzzle input using [AOCD](https://github.com/wimglenn/advent-of-code-data).

Populate `input.txt` with your solution input, and then start implementing your solution in the day's folder.

## Viewer

A local webserver has been provided to browse the solutions, and optionally create web based visualisations to go with the code.

To start the server run: `npm run webserver` - a new hardcoded index.html will be generated each time you browse the index.

If you enable github pages from your repo settings, and host from the root of the project, you'll be able to access this index and the solutions from the provided hosted URL. Please replace this message with a link to those pages if you do.

