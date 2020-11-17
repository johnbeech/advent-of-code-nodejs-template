const { read, write } = require('promise-path')
const { position, find } = require('promise-path')

const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('./package.json')).logName} / ${__filename.split(path.sep).pop().split('.js').shift()}]`, ...messages)

async function replaceInFile(filename, search, replace) {
  const haystack = await read(filename, 'utf8')
  const ashes = haystack.replace(search, replace)
  return write(filename, ashes, 'utf8')
}

async function setup() {
  const currentPath = fromHere('/')
  const currentFolder = currentPath.split('/').pop()
  const currentYear = currentFolder.split('-').pop()
  if (currentYear) {
    report(`Setting up template for ${currentYear}`)
  }
  else {
    console.error('No current year provided; please re-run setup with an argument, e.g.: 2020, 2021, 2022, etc.')
    process.exit(1)
  }

  await replaceInFile('package.json', /Advent of Code Template/g, `Advent of Code ${currentYear}`)
  await replaceInFile('README.md', '# Advent of Code Template', `# Advent of Code ${currentYear}`)
  
  await replaceInFile('package.json', 'Advent of Code Template using Node JS for Current Year.', `My solutions for Advent of Code ${currentYear}.`)
  await replaceInFile('README.md', 'Advent of Code Template using Node JS for Current Year.', `My solutions for Advent of Code ${currentYear}.`)

  await replaceInFile('package.json', 'advent-of-code-template', currentFolder)
}

setup()