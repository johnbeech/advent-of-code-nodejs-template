workflow "Test Changes" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  args = "install"
}

action "Test" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  needs = ["Install"]
  args = "test"
}
