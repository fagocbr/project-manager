import { crud } from 'genesis/infra/router/resources'
import { path, namespace, grid, form, meta, id } from '../model'

export default crud(path, namespace, grid, form, meta, id)
