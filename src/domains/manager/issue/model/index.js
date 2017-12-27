import model from 'genesis/support/model'
import { resource } from 'src/app/services/gitlab/resource'

/**
 * @type {string}
 */
export const icon = 'dns'

/**
 * @type {string}
 */
export const label = 'Atividades'

/**
 * @type {string}
 */
export const title = 'Cadastro de Atividades'

/**
 * @type {string}
 */
export const tooltip = 'As Atividades são as fontes de dados para gerenciar'

/**
 * @type {string}
 */
export const description = 'Com o Cadastro de Atividades é possível gerir os fluxos de produtos de trabalho da aplicação'

/**
 * @type {string}
 */
export const api = '/projects/1/issues'

/**
 * @type {string}
 */
export const id = 'id'

/**
 * @type {string}
 */
export const path = '/dashboard/manager/issue'

/**
 * @type {string}
 */
export const namespace = 'manager.issue'

/**
 * @type {ResourceGitlab}
 */
export const service = resource(api, {sort: 'desc'})

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
  return model.grid(service, path, id, fields(scope, route),
    filters(scope, route), actions, options)
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
  return model.form(service, scope, path, id, fields(scope, route), actions,
    options)
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
      model.field('title', 'Título').$text().$render(),
      model.field('description', 'Descrição').$textarea().$render(),
      {
        'id': 1,
        'iid': 1,
        'project_id': 1,
        'title': 'Utilizar matrícula em Funcionario e Aluno',
        'description': 'É preciso modificar os serviços de sincronização para enviarem os códigos de matrícula com base no formato [1,2][código] com 10 dígitos',
        'state': 'closed',
        'created_at': '2015-11-24T17:18:58.192Z',
        'updated_at': '2017-10-17T16:34:17.216Z',
        'labels': ['enhancement'],
        'milestone': {
          'id': 1,
          'iid': 1,
          'project_id': 1,
          'title': '#1 - 5.10.0.9',
          'description': '',
          'state': 'closed',
          'created_at': '2015-11-24T17:22:04.231Z',
          'updated_at': '2016-02-18T22:45:40.128Z',
          'due_date': '2015-11-30',
          'start_date': null
        },
        'author': {
          'id': 3,
          'name': 'William',
          'username': 'wilcorrea',
          'state': 'active',
          'avatar_url': 'http://git.fagoc.br/uploads/-/system/user/avatar/3/1457647_683894968300303_1586681565_n.jpg',
          'web_url': 'http://git.fagoc.br/wilcorrea'
        },
        'assignee': {
          'id': 3,
          'name': 'William',
          'username': 'wilcorrea',
          'state': 'active',
          'avatar_url': 'http://git.fagoc.br/uploads/-/system/user/avatar/3/1457647_683894968300303_1586681565_n.jpg',
          'web_url': 'http://git.fagoc.br/wilcorrea'
        },
        'user_notes_count': 0,
        'upvotes': 0,
        'downvotes': 0,
        'due_date': null,
        'confidential': false,
        'web_url': 'http://git.fagoc.br/desenvolvimento/siga/issues/1',
        'subscribed': true
      }
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
