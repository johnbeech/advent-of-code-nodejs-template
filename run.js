const solutionId = process.argv[2]
try {
  require(`./solutions/${solutionId}/solution.js`)
} catch (ex) {
  if (!solutionId) {
    console.error('No solution ID provided; please re-run with an argument, e.g.: npm start day1, or: node run day1')
  } else {
    console.error(`Unable to run solution for '${solutionId}': ${ex}`, ex.stack)
  }
}
