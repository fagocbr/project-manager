import model from 'genesis/support/model'
import { resource } from 'src/app/services/firebase/resource'

/**
 * @type {string}
 */
export const icon = 'dashboard'

/**
 * @type {string}
 */
export const label = 'Projetos'

/**
 * @type {string}
 */
export const title = 'Cadastro de Projetos'

/**
 * @type {string}
 */
export const tooltip = 'Projetos são responsáveis por gerenciar os fluxos de trabalho'

/**
 * @type {string}
 */
export const description = 'Um projeto pode ter repositórios, tarefas, chamados, mudanças e tudo o que é necessário para gerenciar os recursos'

/**
 * @type {string}
 */
export const api = 'projects'

/**
 * @type {string}
 */
export const id = '_id'

/**
 * @type {string}
 */
export const path = '/dashboard/manager/project'

/**
 * @type {string}
 */
export const namespace = 'manager.projects'

/**
 * @type {Resource}
 */
export const service = resource(api)

/**
 * @type {Object}
 */
export const meta = model.meta(icon, label, title, tooltip)

/**
 * @type {Function}
 */
export const menu = model.menu(icon, label, path, false, tooltip, `id-${namespace}`, namespace, 1)

/**
 * @param {string} scope
 * @param {Route} route
 * @returns {Object}
 */
export const grid = (scope, route) => {
  const options = {
    debug: true
  }
  return model.grid(service, path, id, fields(scope, route), filters(scope, route), actions, options)
}

/**
 * @param {string} scope
 * @param {Route} route
 * @returns {Object}
 */
export const form = (scope, route) => {
  const options = {
    tab: '',
    tabs: [],
    debug: true
  }
  return model.form(service, scope, path, id, fields(scope, route), actions, options)
}

/**
 * @param {string} scope
 * @param {Route} route
 * @returns {Array}
 */
export const fields = (scope, route = null) => {
  return model.filter(
    [
      model.field(id, 'Código').$pk().$render(),
      model.field('_key', 'Key').$pk().$render(),
      model.field('name', 'Nome').$required().$text().$render(),
      model.field('description', 'Descrição').$form({default: ''}).$textarea().$render()
    ],
    scope
  )
}

/**
 * @param {AppCrudGrid|AppCrudForm} $this
 * @param {Array} actions
 * @returns {Array}
 */
export const actions = ($this, actions) => {
  return actions
}

/**
 * @param {string} scope
 * @param {Route} route
 * @returns {Array}
 */
export const filters = (scope, route = null) => {
  return []
}
