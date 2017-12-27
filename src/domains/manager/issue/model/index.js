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
export const service = resource(api, {sort: 'asc'})

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
        'id': 24,
        'description': 'Gennesis',
        'default_branch': null,
        'tag_list': [],
        'public': false,
        'archived': false,
        'visibility_level': 10,
        'ssh_url_to_repo': 'git@git.fagoc.br:desenvolvimento/gennesis.fagoc.br.git',
        'http_url_to_repo': 'http://git.fagoc.br/desenvolvimento/gennesis.fagoc.br.git',
        'web_url': 'http://git.fagoc.br/desenvolvimento/gennesis.fagoc.br',
        'name': 'gennesis.fagoc.br',
        'name_with_namespace': 'desenvolvimento / gennesis.fagoc.br',
        'path': 'gennesis.fagoc.br',
        'path_with_namespace': 'desenvolvimento/gennesis.fagoc.br',
        'resolve_outdated_diff_discussions': null,
        'container_registry_enabled': true,
        'issues_enabled': true,
        'merge_requests_enabled': true,
        'wiki_enabled': true,
        'builds_enabled': true,
        'snippets_enabled': false,
        'created_at': '2017-08-23T14:39:28.270Z',
        'last_activity_at': '2017-08-23T14:39:28.270Z',
        'shared_runners_enabled': true,
        'lfs_enabled': true,
        'creator_id': 6,
        'namespace': {
          'id': 16,
          'name': 'desenvolvimento',
          'path': 'desenvolvimento',
          'kind': 'group',
          'full_path': 'desenvolvimento',
          'parent_id': null,
          'members_count_with_descendants': 13
        },
        'avatar_url': null,
        'star_count': 0,
        'forks_count': 0,
        'open_issues_count': 0,
        'public_builds': true,
        'shared_with_groups': [],
        'only_allow_merge_if_build_succeeds': false,
        'request_access_enabled': false,
        'only_allow_merge_if_all_discussions_are_resolved': false,
        'permissions': {'project_access': null, 'group_access': {'access_level': 50, 'notification_level': 3}}
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
