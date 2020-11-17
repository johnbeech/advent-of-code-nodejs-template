const path = require('path')
const express = require('express')
const { position, find } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../package.json')).logName} / ${__filename.split(path.sep).pop().split('.js').shift()}]`, ...messages)

const app = express()
const packageData = require('../package.json')

app.use('/solutions', express.static(fromHere('')))

app.get('/', async (req, res) => {
  const title = packageData.logName

  const solutions = await find(fromHere('/*'))
  const links = solutions.map(solution => {
    const folder = solution.substr(fromHere('../').length)
    return `<li><a href="${folder}/viewer.html">${folder}</a></li>`
  }).filter(n => n.indexOf('.js') === -1)

  res.send(`<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <style> html, body { font-family: sans-serif; }</style>
  </head>
  <body>
    <h1>${title}</h1>
    <ul>
      ${links.join('\n')}
    </ul>
  </body>
</html>
`)
})

const port = 8080
app.listen(port, () => report(`Listening on http://localhost:${port}/`))
