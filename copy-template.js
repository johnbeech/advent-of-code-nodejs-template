const path = require('path')
const { make, position, find, read, write } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('./package.json')).logName} / ${__filename.split(path.sep).pop().split('.js').shift()}]`, ...messages)

async function run () {
  const newFolderName = process.argv[2]
  const templateFolderPath = 'solutions/template'
  const targetFolderPath = fromHere(`solutions/${newFolderName}`)

  if (!newFolderName) {
    return report(
      'No path specified to copy to.',
      'Please specify a folder name as an argument to this script.',
      'e.g. node copy-template day5'
    )
  }

  const existingFiles = await find(`${targetFolderPath}/*`)
  if (existingFiles.length > 0) {
    report('Existing files found:')
    console.log(existingFiles.map(n => '  ' + n).join('\n'))
    return report('Path', newFolderName, 'already exists, doing nothing.')
  }

  report('Creating:', `solutions/${newFolderName}`, 'from template', templateFolderPath)

  const templateFiles = await find(fromHere(`${templateFolderPath}/*`))
  await make(fromHere(`solutions/${newFolderName}`))
  await Promise.all(templateFiles.map(async (filepath) => {
    const contents = await read(filepath)
    const filename = path.parse(filepath).base
    const newFilePath = `solutions/${newFolderName}/${filename}`
    report('Creating:', newFilePath)
    return write(fromHere(newFilePath), contents)
  }))

  report('Done.')
}

run()
