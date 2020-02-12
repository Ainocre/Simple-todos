import Vue from 'vue'
import { model, type, store, Collection } from './storeUtils'


const UserModel = model('User', {
    email: { type: type.email, required: true },
})

const commonRules = (rules) => ({ all: [rules.mine()] })

const TaskModel = model('Task', {
    title: { type: type.string, required: true, input: { type: 'text', label: 'Nom de la tâche' } },
    checked: { type: type.boolean, default: false },
    starred: { type: type.boolean, default: false },
    notes: { type: type.string, input: { type: 'textarea', label: 'Notes de la tâche' } },
    userId: { type: type.string, required: true, refToCollection: { user: 'users' } },
    categoryId: { type: type.string, required: true, refToCollection: { category: 'categories' } },
})

const CategoryModel = model('Category', {
    title: { type: type.string, required: true, input: { type: 'text', label: 'Nom de la catégorie' } },
    userId: { type: type.string, required: true, refToCollection: { user: 'users' } },
})

const Store = store({
    users: Collection('users', UserModel, commonRules),
    tasks: Collection('tasks', TaskModel, commonRules),
    categories: Collection('categories', CategoryModel, commonRules),
})

Store.auth()

if (process.env.NODE_ENV === 'development') {
    window.store = Store
}

Vue.prototype.store = Store
