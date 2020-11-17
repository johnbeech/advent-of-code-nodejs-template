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

  if (currentYear === 'template') {
    console.error('  No current year provided.')
    console.error('  Please re-run setup after renaming the repo, e.g.: advent-of-code-2020, advent-of-code-2021, advent-of-code-2022, etc.')
    console.error('')
    process.exit(0)
  }

  await replaceInFile('README.md', 'If using the Advent of Code Template repo; click [**`Use this template`**](./generate) to set a new repository name, e.g.: `advent-of-code-20xx`.\n', '')
  await replaceInFile('README.md', 'If this a brand new repository, run: `node setup` to configure it for Current Year.\n', '')

  await replaceInFile('package.json', /Advent of Code Template/g, `Advent of Code ${currentYear}`)
  await replaceInFile('README.md', '# Advent of Code Template', `# Advent of Code ${currentYear}`)
  
  await replaceInFile('package.json', 'Advent of Code Template using Node JS for Current Year.', `My solutions for Advent of Code ${currentYear}.`)
  await replaceInFile('README.md', 'Advent of Code Template using Node JS for Current Year.', `My solutions for Advent of Code ${currentYear}.`)

  await replaceInFile('package.json', 'advent-of-code-template', currentFolder)
}

setup()