import { meta } from 'genesis/support/model'
import { route } from 'genesis/infra/router/resources'

import project from 'src/domains/manager/project/routes'
import repository from 'src/domains/manager/repository/routes'
import issue from 'src/domains/manager/issue/routes'

export const managerPath = '/dashboard/manager'
export const managerName = 'manager.index'
export const managerComponent = 'app/modules/dashboard/components/DashboardRouterView'
export const managerMeta = Object.assign(
  {}, {noLink: true}, meta('format_quote', '<~>', '<~>')
)

export const routes = [
  route(managerPath, managerName, managerComponent, {}, managerMeta, [
    ...project,
    ...repository,
    ...issue
  ])
]
