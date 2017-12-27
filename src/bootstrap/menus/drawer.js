// import { group, menu, item } from 'genesis/modules/dashboard'

import { menu as project } from 'src/domains/manager/project/model'
import { menu as repository } from 'src/domains/manager/repository/model'
import { menu as issue } from 'src/domains/manager/issue/model'

export default (to) => [
  project(to),
  repository(to),
  issue(to)
]
