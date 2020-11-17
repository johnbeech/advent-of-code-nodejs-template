const path = require('path')
const { read, write, position, find } = require('promise-path')

const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('./package.json')).logName} / ${__filename.split(path.sep).pop().split('.js').shift()}]`, ...messages)

async function replaceInFile(filename, search, replace) {
  const haystack = await read(filename, 'utf8')
  const ashes = haystack.replace(search, replace)
  return write(filename, ashes, 'utf8')
}

async function setup() {
  const currentPath = fromHere('/')
  const currentFolder = currentPath.split('/').reverse()[1]

  report('Setting up template from:', currentFolder)

  const currentYear = currentFolder.split('-').pop()

  await replaceInFile('package.json', /Advent of Code Template/g, `Advent of Code ${currentYear}`)
  await replaceInFile('README.md', '# Advent of Code Template', `# Advent of Code ${currentYear}`)
  
  await replaceInFile('package.json', 'Advent of Code Template using Node JS for Current Year.', `My solutions for Advent of Code ${currentYear}.`)
  await replaceInFile('README.md', 'Advent of Code Template using Node JS for Current Year.', `My solutions for Advent of Code ${currentYear}.`)

  await replaceInFile('package.json', 'advent-of-code-template', currentFolder)
}

setup()